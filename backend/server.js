const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
    const { email, phone, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: "New contact form message",
            text: `
Email: ${email}
Phone: ${phone}

Message:
${message}
            `
        });

        console.log("Email sent successfully");

        res.send("Email sent!");
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).send("Failed to send email");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});