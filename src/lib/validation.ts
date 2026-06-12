const REJECTED_NUMBERS = [
  "0000000000",
  "1111111111",
  "1234567890",
  "2222222222",
  "6635378262",
];

export function validatePhone(phone: string): string | null {
  if (!phone) return "Phone number is required";
  const cleaned = phone.replace(/\s/g, "");
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return "Please enter a valid Indian mobile number";
  }
  if (REJECTED_NUMBERS.includes(cleaned)) {
    return "Please enter a valid Indian mobile number";
  }
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
}

export function validateFullName(name: string): string | null {
  if (!name) return "Full name is required";
  if (name.trim().length < 2) return "Please enter a valid name";
  return null;
}
