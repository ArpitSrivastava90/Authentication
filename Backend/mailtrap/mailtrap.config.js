import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = "89f36d2b4950e8c7983dd4050143efb3"; // Use environment variable

export const Mailtrapclient = new MailtrapClient({ token: TOKEN });

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Yash",
};
