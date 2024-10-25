import nodemailer from "nodemailer";
import { subMinutes, addSeconds } from "date-fns";
import { Resend } from "resend";

// Initialize Resend for production
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Nodemailer for development
const devTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const priorityMap: Record<number, string> = {
  1: "URGENT",
  2: "High",
  3: "Medium",
  4: "Low",
};

// Store scheduled reminders in memory
const scheduledReminders = new Map<string, NodeJS.Timeout[]>();

// Define email data interface
interface EmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const getDefaultFromEmail = (): string => {
  const productionEmail = process.env.EMAIL_FROM;
  const developmentEmail = process.env.EMAIL_USER;

  if (!productionEmail && !developmentEmail) {
    throw new Error(
      "No sender email address configured. Please set EMAIL_FROM or EMAIL_USER environment variable."
    );
  }

  return productionEmail || developmentEmail || "noreply@yourdomain.com";
};

const createEmailTemplate = (
  task: Task,
  userEmail: string,
  minutesRemaining: number
): EmailData => {
  const priorityColors: Record<number, string> = {
    1: "#d1453b",
    2: "#eb8909",
    3: "#246fe0",
    4: "#9e9e9e",
  };

  const priorityLabel = priorityMap[task.priority];
  const priorityColor = priorityColors[task.priority];

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Task Reminder</h2>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
        <h3 style="margin: 0 0 10px 0;">${task.taskName}</h3>
        <p style="margin: 5px 0;"><strong>Description:</strong> ${
          task.description || "No description provided"
        }</p>
        <p style="margin: 5px 0;">
          <strong>Priority:</strong> 
          <span style="color: ${priorityColor}; font-weight: bold;">
            ${priorityLabel}
          </span>
        </p>
        <p style="margin: 5px 0;"><strong>Due Date:</strong> ${task.dueDate.format(
          "MMMM D, YYYY h:mm A"
        )}</p>
        <p style="margin: 15px 0 0 0; color: #666;">
          <strong>⏰ This task is due in ${minutesRemaining} minutes!</strong>
        </p>
        ${
          task.priority === 1
            ? `
          <div style="margin-top: 15px; padding: 10px; background-color: #FFE5E5; border-left: 4px solid #FF0000; border-radius: 4px;">
            <p style="margin: 0; color: #FF0000;">⚠️ This is an URGENT priority task that requires immediate attention!</p>
          </div>
        `
            : ""
        }
      </div>
    </div>
  `;

  return {
    from: getDefaultFromEmail(),
    to: userEmail,
    subject: `Reminder: Task "${task.taskName}" due in ${minutesRemaining} minutes [${priorityLabel}]`,
    html: htmlContent,
  };
};

const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    if (process.env.NODE_ENV === "production") {
      // Use Resend in production
      await resend.emails.send({
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
      });
    } else {
      // Use Nodemailer in development
      await devTransporter.sendMail(emailData);
    }
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

// Constant for email sending preparation time (in seconds)
const EMAIL_PREP_TIME = 60; // 1 minute buffer for email preparation and sending

const scheduleReminder = (
  task: Task,
  userEmail: string,
  minutesBefore: number
): NodeJS.Timeout | null => {
  const dueDate = task.dueDate.toDate();
  // Add buffer time to account for email preparation and sending
  const notificationTime = addSeconds(
    subMinutes(dueDate, minutesBefore),
    -EMAIL_PREP_TIME
  );
  const now = new Date();

  if (notificationTime > now) {
    const timeoutMs = notificationTime.getTime() - now.getTime();

    const timeout = setTimeout(async () => {
      const startTime = Date.now();
      const emailData = createEmailTemplate(task, userEmail, minutesBefore);
      await sendEmail(emailData);
      const endTime = Date.now();
      console.log(`${minutesBefore}-minute reminder sent for task: ${task.id}`);
      console.log(`Email sending took ${(endTime - startTime) / 1000} seconds`);
    }, timeoutMs);

    return timeout;
  }
  return null;
};

export const scheduleTaskReminders = async (
  task: Task,
  userEmail: string
): Promise<boolean> => {
  try {
    // Cancel existing reminders if any
    if (scheduledReminders.has(task.id)) {
      cancelTaskReminders(task.id);
    }

    const reminders: NodeJS.Timeout[] = [];
    const reminderTimes = [10, 5]; // minutes before due date

    reminderTimes.forEach((minutes) => {
      const reminder = scheduleReminder(task, userEmail, minutes);
      if (reminder) {
        reminders.push(reminder);
        const dueDate = task.dueDate.toDate();
        const scheduledTime = subMinutes(dueDate, minutes);
        console.log(
          `Scheduled ${minutes}-minute reminder for: ${scheduledTime.toISOString()}`
        );
      }
    });

    if (reminders.length > 0) {
      scheduledReminders.set(task.id, reminders);
      console.log(`Reminders scheduled for task: ${task.id}`);
      return true;
    }

    console.log(
      `No reminders scheduled for task: ${task.id} (due date might be too soon)`
    );
    return false;
  } catch (error) {
    console.error("Error scheduling reminders:", error);
    return false;
  }
};

export const cancelTaskReminders = (taskId: string): void => {
  const reminders = scheduledReminders.get(taskId);
  if (reminders) {
    reminders.forEach((timeout) => clearTimeout(timeout));
    scheduledReminders.delete(taskId);
    console.log(`Reminders cancelled for task: ${taskId}`);
  }
};
