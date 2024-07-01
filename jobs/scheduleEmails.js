const cron = require("node-cron");
const emailService = require("../services/emailService");

const scheduleEmails = () => {
  cron.schedule(" * * * * *", async () => {
    try {
      const notificationsToSend = await emailService.getNotificationsToSend();
      notificationsToSend.forEach(async (notification) => {
        await emailService.sendNotificationEmail(
          notification.email,
          notification.text
        );
        await emailService.updateNotificationState(notification.id);

        console.log(
          `Email sent to ${
            notification.email
          } at ${new Date().toLocaleTimeString()}`
        );
      });
    } catch (error) {
      console.error(
        "Error sending email or updating notification status:",
        error
      );
    }
  });
};

module.exports = { scheduleEmails };




