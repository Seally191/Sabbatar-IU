const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route
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
            from: process.env.EMAIL_USER,  
            replyTo: email,               
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
        res.status(200).send("OK");

    } catch (error) {
        console.error("Email error:", error);
        res.status(500).send("Failed to send email");
    }
});

// Port (important for Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});