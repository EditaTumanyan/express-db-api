const db = require("../database/db");
const nodemailer = require("nodemailer");
const moment = require("moment");

const emailService = {
  async createNotification(email, text, scheduleDate) {
    try {
      const newNotification = await db
        .getInstance()("notifications")
        .insert({ email, text, scheduleDate, isActive: true });

      return newNotification;
    } catch (error) {
      console.log("Error creating notification:", error);
      throw error;
    }
  },

  async getNotificationsToSend() {
    try {
      const notifications = await db
        .getInstance()
        .select("*")
        .from("notifications")
        .where("isActive", true)
        .andWhere(
          "scheduleDate",
          "<=",
          moment().format("YYYY-MM-DD HH:mm:ss.SSSSSS Z")
        );

      // console.log(moment().format("YYYY-MM-DD HH:mm:ss.SSSSSS Z"));
      // console.log(notifications.length);

      return notifications;
    } catch (error) {
      console.log("Error getting notifications to send:", error);
      throw error;
    }
  },

  async sendNotificationEmail(email, text) {
    try {
      const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
          user: "dc44bae8723d8f",
          pass: "96de925692e39d",
        },
      });
      const mailOptions = {
        from: "no-reply@yourapp.com",
        to: email,
        subject: "Notfication from Mailtrap",
        text: text,
      };

      await transporter.sendMail(mailOptions);

      console.log(
        `Email sent to ${email} at ${new Date().toLocaleTimeString()}`
      );
    } catch (error) {
      console.log("Error sending email:", error);
      throw error;
    }
  },

  async updateNotificationState(id) {
    try {
      await db
        .getInstance()("notifications")
        .where({ id })
        .update({ isActive: false });

      console.log(`Notification with ID ${id} status updated.`);
    } catch (error) {
      console.error("Error updating notification status:", error.message);
      throw error;
    }
  },
};
module.exports = emailService;
