import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

// Füge Debugging hinzu
console.log("Email-Konfiguration:", {
  user: process.env.SMTP_USER ? "Vorhanden" : "Fehlt",
  pass: process.env.SMTP_PASS ? "Vorhanden" : "Fehlt"
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Teste die SMTP-Verbindung beim Start
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP-Verbindungsfehler:", error);
  } else {
    console.log("SMTP-Server ist bereit");
  }
});

export const sendBookingConfirmation = async (email, event) => {
  try {
    console.log("Starte Email-Versand mit folgenden Daten:", {
      email,
      eventTitle: event.title,
      smtpUser: process.env.SMTP_USER
    });
    
    const result = await transporter.sendMail({
      from: `"EventBooker" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Buchungsbestätigung: ${event.title}`,
      html: `
        <h2>🎉 Vielen Dank für deine Buchung!</h2>
        <p><strong>Event:</strong> ${event.title}</p>
        <p><strong>Ort:</strong> ${event.location}</p>
        <p><strong>Datum:</strong> ${new Date(event.date).toLocaleDateString()}</p>
        <p>Deine Buchung ist bestätigt. Wir freuen uns auf dich!</p>
      `,
    });
    
    console.log("E-Mail-Details:", {
      messageId: result.messageId,
      response: result.response,
      accepted: result.accepted,
      rejected: result.rejected
    });
    
    return result;
  } catch (error) {
    console.error("Detaillierter E-Mail-Fehler:", {
      errorMessage: error.message,
      errorCode: error.code,
      errorCommand: error.command
    });
    throw error;
  }
};
