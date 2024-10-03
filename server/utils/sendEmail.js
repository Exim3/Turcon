import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      // host: process.env.HOST,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS,
      },
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.SECURE === "true",
      debug: true,
    });
    await transporter
      .verify()
      .then(() => {
        console.log("Transporter is ready to send emails");
      })
      .catch((err) => {
        console.error("Transporter verification failed", err);
      });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: text,
    });
    console.log("email sent succesfully");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};
