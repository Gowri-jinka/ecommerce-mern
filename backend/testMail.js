import nodemailer from "nodemailer";

const sendTest = async () => {
  console.log(" Sending test mail...");

  try {
    const testAccount = await nodemailer.createTestAccount();   //creates temporary email credentials

    const transporter = nodemailer.createTransport({    //defines how email sent
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      },
      tls: {
        rejectUnauthorized: false   // desables ssl certificate validation
      }
    });

    const info = await transporter.sendMail({
      from: "test@test.com",
      to: "test@test.com",
      subject: "Test Mail",
      text: "Working!"
    });

    console.log("Email sent successfully");
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    

  } catch (err) {
    console.log("❌ Error:", err);
  }
};

sendTest();