const { notificationSchema } = require("../validators/notificationValidators");
const emailService = require("../services/emailService");

const createNotification = async (req, res) => {
  const { error } = notificationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages.join(", ") });
  }
  const { email, text, scheduleDate } = req.body;
  try {
    const newNotification = await emailService.createNotification(
      email,
      text,
      scheduleDate
    );
    return res.status(201).json({ message: "Notification created" });
  } catch (error) {
    console.log("Error creating notification:", error.message);
    return res.status(500).json({ message: "Error creating notification" });
  }
};

const getNotifications = async (req, res) => {
  const { id } = req.params;
  try {
    const notifications = await emailService.getNotificationsToSend(id);
    return res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error getting notifications:", error.message);
    return res.status(500).json({ message: "Error getting notifications" });
  }
};

module.exports = { createNotification, getNotifications };
