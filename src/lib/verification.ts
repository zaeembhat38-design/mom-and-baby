// Lightweight OTP verification using sessionStorage

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

interface OTPData {
  code: string;
  expiresAt: number;
}

export function sendPhoneOTP(mobile: string): string {
  const otp = generateOTP();
  const data: OTPData = {
    code: otp,
    expiresAt: Date.now() + 2 * 60 * 1000, // 2 minutes
  };
  sessionStorage.setItem(`otp_phone_${mobile}`, JSON.stringify(data));
  return otp;
}

export function verifyPhoneOTP(mobile: string, inputCode: string): boolean {
  const stored = sessionStorage.getItem(`otp_phone_${mobile}`);
  if (!stored) return false;
  const data: OTPData = JSON.parse(stored);
  if (Date.now() > data.expiresAt) {
    sessionStorage.removeItem(`otp_phone_${mobile}`);
    return false;
  }
  if (data.code === inputCode) {
    sessionStorage.removeItem(`otp_phone_${mobile}`);
    return true;
  }
  return false;
}

export function sendEmailOTP(email: string): string {
  const otp = generateOTP();
  const data: OTPData = {
    code: otp,
    expiresAt: Date.now() + 2 * 60 * 1000,
  };
  sessionStorage.setItem(`otp_email_${email}`, JSON.stringify(data));
  return otp;
}

export function verifyEmailOTP(email: string, inputCode: string): boolean {
  const stored = sessionStorage.getItem(`otp_email_${email}`);
  if (!stored) return false;
  const data: OTPData = JSON.parse(stored);
  if (Date.now() > data.expiresAt) {
    sessionStorage.removeItem(`otp_email_${email}`);
    return false;
  }
  if (data.code === inputCode) {
    sessionStorage.removeItem(`otp_email_${email}`);
    return true;
  }
  return false;
}
