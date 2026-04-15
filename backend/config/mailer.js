import nodemailer from "nodemailer";

let transporter = null;

// ✅ ALWAYS CREATE PROPER TRANSPORTER
export const createTransporter = async () => {
  const testAccount = await nodemailer.createTestAccount();

  console.log("ETHEREAL USER:", testAccount.user);
  console.log("ETHEREAL PASS:", testAccount.pass);

  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  console.log("Ethereal Email Ready");
};

// ✅ RETURN ONLY VALID TRANSPORTER
export const getTransporter = () => {
  if (!transporter) {
    throw new Error("Transporter not initialized");
  }
  return transporter;
};