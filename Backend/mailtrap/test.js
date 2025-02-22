import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "89f36d2b4950e8c7983dd4050143efb3",
  },
});

async function main() {
  // send mail with defined transport object
  const info = await transport.sendMail({
    from: "hello@demomailtrap.com", // sender address
    to: "arpitsrivastav2023@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
