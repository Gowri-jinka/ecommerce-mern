import nodemailer from "nodemailer";

let transporter;

const createTransporter = async () => {
  const testAccount = await nodemailer.createTestAccount();

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

await createTransporter();

export default transporter;