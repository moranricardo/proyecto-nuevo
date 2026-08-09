const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

async function enviarAlerta(asunto, mensaje) {
    try {
        await transporter.sendMail({
            from: `"Ra Pulse" <${process.env.GMAIL_USER}>`,
            to: process.env.ALERT_EMAIL,
            subject: asunto,
            text: mensaje
        });
        return true;
    } catch (error) {
        console.error("Error al enviar:", error);
        return false;
    }
}

module.exports = { enviarAlerta };
