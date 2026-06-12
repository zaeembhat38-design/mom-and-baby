import { openDB, DBSchema, IDBPDatabase } from "idb";

export interface User {
  id?: number;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  createdAt: string;
}

export interface Appointment {
  id?: number;
  userId: number;
  patientName: string;
  phone: string;
  email: string;
  appointmentType: string;
  doctor: string;
  date: string;
  time: string;
  notes: string;
  status: "upcoming" | "completed" | "cancelled";
  createdAt: string;
}

export interface VerifiedNumber {
  mobile: string;
  verifiedAt: string;
}

export interface VerifiedEmail {
  email: string;
  verifiedAt: string;
}

interface ClinicDB extends DBSchema {
  users: {
    key: number;
    value: User;
    indexes: {
      "by-email": string;
      "by-mobile": string;
    };
  };
  appointments: {
    key: number;
    value: Appointment;
    indexes: {
      "by-userId": number;
      "by-phone-date": [string, string];
    };
  };
  verified_numbers: {
    key: string;
    value: VerifiedNumber;
  };
  verified_emails: {
    key: string;
    value: VerifiedEmail;
  };
}

let dbPromise: Promise<IDBPDatabase<ClinicDB>> | null = null;

function getDB(): Promise<IDBPDatabase<ClinicDB>> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("IndexedDB not available on server"));
  }
  if (!dbPromise) {
    dbPromise = openDB<ClinicDB>("mom-baby-clinic-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("users")) {
          const userStore = db.createObjectStore("users", {
            keyPath: "id",
            autoIncrement: true,
          });
          userStore.createIndex("by-email", "email", { unique: true });
          userStore.createIndex("by-mobile", "mobile", { unique: true });
        }
        if (!db.objectStoreNames.contains("appointments")) {
          const appointmentStore = db.createObjectStore("appointments", {
            keyPath: "id",
            autoIncrement: true,
          });
          appointmentStore.createIndex("by-userId", "userId");
          appointmentStore.createIndex("by-phone-date", ["phone", "date"]);
        }
        if (!db.objectStoreNames.contains("verified_numbers")) {
          db.createObjectStore("verified_numbers", { keyPath: "mobile" });
        }
        if (!db.objectStoreNames.contains("verified_emails")) {
          db.createObjectStore("verified_emails", { keyPath: "email" });
        }
      },
    });
  }
  return dbPromise;
}

// User operations
export async function createUser(user: Omit<User, "id">): Promise<User> {
  const db = await getDB();
  const existingByEmail = await db.getFromIndex("users", "by-email", user.email);
  if (existingByEmail) throw new Error("Email already registered");
  const existingByMobile = await db.getFromIndex("users", "by-mobile", user.mobile);
  if (existingByMobile) throw new Error("Mobile number already registered");
  const id = await db.add("users", user as User);
  return { ...user, id: id as number };
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await getDB();
  return db.getFromIndex("users", "by-email", email);
}

export async function getUserById(id: number): Promise<User | undefined> {
  const db = await getDB();
  return db.get("users", id);
}

export async function updateUser(user: User): Promise<void> {
  const db = await getDB();
  await db.put("users", user);
}

// Appointment operations
export async function createAppointment(
  appointment: Omit<Appointment, "id">
): Promise<Appointment> {
  const db = await getDB();
  // Check duplicate booking: same phone, same date
  const existing = await db.getFromIndex("appointments", "by-phone-date", [
    appointment.phone,
    appointment.date,
  ]);
  if (existing && existing.status !== "cancelled") {
    throw new Error("You already have an appointment on this date.");
  }
  const id = await db.add("appointments", appointment as Appointment);
  return { ...appointment, id: id as number };
}

export async function getAppointmentsByUser(
  userId: number
): Promise<Appointment[]> {
  const db = await getDB();
  return db.getAllFromIndex("appointments", "by-userId", userId);
}

export async function updateAppointment(appointment: Appointment): Promise<void> {
  const db = await getDB();
  await db.put("appointments", appointment);
}

export async function deleteAppointment(id: number): Promise<void> {
  const db = await getDB();
  await db.delete("appointments", id);
}

// Verification operations
export async function saveVerifiedNumber(mobile: string): Promise<void> {
  const db = await getDB();
  await db.put("verified_numbers", {
    mobile,
    verifiedAt: new Date().toISOString(),
  });
}

export async function isNumberVerified(mobile: string): Promise<boolean> {
  const db = await getDB();
  const record = await db.get("verified_numbers", mobile);
  return !!record;
}

export async function saveVerifiedEmail(email: string): Promise<void> {
  const db = await getDB();
  await db.put("verified_emails", {
    email,
    verifiedAt: new Date().toISOString(),
  });
}

export async function isEmailVerified(email: string): Promise<boolean> {
  const db = await getDB();
  const record = await db.get("verified_emails", email);
  return !!record;
}
