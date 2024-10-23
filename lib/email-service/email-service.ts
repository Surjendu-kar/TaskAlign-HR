import nodemailer from "nodemailer";
import { subMinutes } from "date-fns";
import cron from "node-cron";

const transporter = nodemailer.createTransport({
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

const scheduledTasks = new Map<string, cron.ScheduledTask[]>();

const createTaskEmailTemplate = (
  task: Task,
  userEmail: string,
  minutesRemaining: number
) => {
  const priorityColors: Record<number, string> = {
    1: "#d1453b",
    2: "#eb8909",
    3: "#246fe0",
    4: "#9e9e9e",
  };

  const priorityLabel = priorityMap[task.priority];
  const priorityColor = priorityColors[task.priority];

  return {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Reminder: Task "${task.taskName}" due in ${minutesRemaining} minutes [${priorityLabel}]`,
    html: `
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
    `,
  };
};

const scheduleEmail = (
  task: Task,
  userEmail: string,
  minutesBefore: number
) => {
  const dueDate = task.dueDate.toDate();
  const notificationTime = subMinutes(dueDate, minutesBefore);

  if (notificationTime > new Date()) {
    const schedule = cron.schedule(
      `${notificationTime.getMinutes()} ${notificationTime.getHours()} ${notificationTime.getDate()} ${
        notificationTime.getMonth() + 1
      } *`,
      async () => {
        try {
          await transporter.sendMail(
            createTaskEmailTemplate(task, userEmail, minutesBefore)
          );
          console.log(
            `${minutesBefore}-minute reminder sent for task: ${task.id}`
          );
          schedule.stop();
        } catch (error) {
          console.error(
            `Error sending ${minutesBefore}-minute reminder:`,
            error
          );
        }
      }
    );

    return schedule;
  }
  return null;
};

export const scheduleTaskReminders = async (
  task: Task,
  userEmail: string
): Promise<boolean> => {
  try {
    if (scheduledTasks.has(task.id)) {
      scheduledTasks.get(task.id)?.forEach((schedule) => schedule.stop());
      scheduledTasks.delete(task.id);
    }

    const schedules: cron.ScheduledTask[] = [];

    const tenMinSchedule = scheduleEmail(task, userEmail, 10);
    if (tenMinSchedule) schedules.push(tenMinSchedule);

    const fiveMinSchedule = scheduleEmail(task, userEmail, 5);
    if (fiveMinSchedule) schedules.push(fiveMinSchedule);

    if (schedules.length > 0) {
      scheduledTasks.set(task.id, schedules);
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
  if (scheduledTasks.has(taskId)) {
    scheduledTasks.get(taskId)?.forEach((schedule) => schedule.stop());
    scheduledTasks.delete(taskId);
    console.log(`Reminders cancelled for task: ${taskId}`);
  }
};
