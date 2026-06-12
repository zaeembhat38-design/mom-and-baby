export const CLINIC = {
  name: "MOM & BABY Polyclinic Handwara",
  shortName: "Mom & Baby",
  address: "Aqaf Building, Jamia Qadeem Handwara, Old Gate Hospital Road, Handwara-KMR, Jammu & Kashmir, India",
  phone: "9797107738",
  whatsapp: "919797107738",
  mapsUrl: "https://maps.google.com/?q=Aqaf+Building+Jamia+Qadeem+Handwara+Old+Gate+Hospital+Road+Handwara+KMR",
} as const;

export const DOCTORS = [
  {
    id: 1,
    name: "Dr. Kaiser Habib",
    specialization: "Gynecologist & Obstetrician",
    subSpecialization: "High-Risk Pregnancy Specialist",
    avatar: "KH",
  },
  {
    id: 2,
    name: "Dr. Bhat Showkat",
    specialization: "Child Specialist & Neonatologist",
    subSpecialization: "",
    avatar: "BS",
  },
] as const;

export const TIMINGS = {
  morning: { label: "Morning", time: "8:00 AM – 9:00 AM" },
  evening: { label: "Evening", time: "4:00 PM – 8:00 PM" },
  sunday: { label: "Sunday", time: "8:00 AM – 6:00 PM" },
} as const;

export const LAB_TESTS = [
  { name: "CBC", description: "Complete Blood Count" },
  { name: "Blood Sugar", description: "Fasting & Post Prandial" },
  { name: "Liver Function", description: "LFT Panel" },
  { name: "Kidney Function", description: "KFT / RFT Panel" },
  { name: "Thyroid Test", description: "T3, T4, TSH" },
  { name: "Urine Test", description: "Routine & Microscopy" },
  { name: "X-Ray", description: "Digital X-Ray" },
  { name: "Ultrasound", description: "Sonography" },
  { name: "ECG", description: "Electrocardiogram" },
  { name: "Coagulogram", description: "Coagulation Profile" },
] as const;

export const SHOP_CATEGORIES = [
  {
    name: "Mother Care Essentials",
    icon: "Heart",
    description: "Prenatal vitamins, maternity support, nursing essentials",
    items: ["Prenatal Supplements", "Maternity Belts", "Nursing Pads", "Stretch Mark Creams"],
  },
  {
    name: "Baby Care Essentials",
    icon: "Baby",
    description: "Diapers, feeding bottles, skincare & hygiene products",
    items: ["Diapers & Wipes", "Feeding Bottles", "Baby Skincare", "Baby Hygiene"],
  },
  {
    name: "Wellness Support",
    icon: "Leaf",
    description: "Vitamins, minerals, and wellness supplements",
    items: ["Multivitamins", "Calcium Supplements", "Iron Supplements", "Omega-3 Fatty Acids"],
  },
  {
    name: "Immunity Support",
    icon: "Shield",
    description: "Immunity boosters for mother and baby",
    items: ["Vitamin C", "Zinc Supplements", "Probiotics", "Herbal Immunity Boosters"],
  },
  {
    name: "Daily Healthcare Products",
    icon: "Plus",
    description: "Everyday healthcare and hygiene products",
    items: ["Thermometers", "BP Monitors", "Sanitizers", "First Aid Kits"],
  },
] as const;

export const APPOINTMENT_TYPES = [
  "General Consultation",
  "Gynecology",
  "Obstetrics",
  "Pediatrics / Child Care",
  "Neonatology",
  "High-Risk Pregnancy",
  "Ultrasound",
  "Laboratory Test",
  "Follow-up Visit",
] as const;

export const TIME_SLOTS = [
  "8:00 AM",
  "8:15 AM",
  "8:30 AM",
  "8:45 AM",
  "4:00 PM",
  "4:15 PM",
  "4:30 PM",
  "4:45 PM",
  "5:00 PM",
  "5:15 PM",
  "5:30 PM",
  "5:45 PM",
  "6:00 PM",
  "6:15 PM",
  "6:30 PM",
  "6:45 PM",
  "7:00 PM",
  "7:15 PM",
  "7:30 PM",
  "7:45 PM",
] as const;
