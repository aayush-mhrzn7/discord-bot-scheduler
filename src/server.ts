import { Client, GatewayIntentBits, Events } from "discord.js";
import cron from "node-cron";
import dotenv from "dotenv";
dotenv.config();
// ----- Schedule Types -----

type Days =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

interface ScheduleEntry {
  time: string;
  subject: string;
  teacher: string;
  teacherCode: string;
  details?: string;
}

type Schedule = Record<Days, ScheduleEntry[]>;

const schedule: Schedule = {
  SUNDAY: [
    {
      time: "07:00 - 08:30 AM",
      subject: "Advanced Java Programming",
      teacher: "Arjun Kumar Rokaya",
      teacherCode: "AKR",
    },
    {
      time: "08:30 - 10:00 AM",
      subject: "Data Warehousing and Data Mining",
      teacher: "Shrada Pathak",
      teacherCode: "SP",
      details: "Lab D, Group A",
    },
    {
      time: "08:30 - 10:00 AM",
      subject: "Advanced Java Programming",
      teacher: "Arjun Kumar Rokaya",
      teacherCode: "AKR",
      details: "Lab C, Group B",
    },
  ],
  MONDAY: [
    {
      time: "07:00 - 08:30 AM",
      subject: "Advanced Java Programming",
      teacher: "Arjun Kumar Rokaya",
      teacherCode: "AKR",
    },
    {
      time: "08:30 - 10:00 AM",
      subject: "Principles of Management",
      teacher: "Sahitya Shrestha",
      teacherCode: "STS",
    },
  ],
  TUESDAY: [
    {
      time: "07:00 - 08:30 AM",
      subject: "Database Administration",
      teacher: "Saroj Shakya",
      teacherCode: "SS",
      details: "Lab C, Group B",
    },
    {
      time: "07:00 - 08:30 AM",
      subject: "Advanced Java Programming",
      teacher: "Arjun Kumar Rokaya",
      teacherCode: "AKR",
      details: "Lab D, Group A",
    },
    {
      time: "08:30 - 10:00 AM",
      subject: "Data Warehousing and Data Mining",
      teacher: "Shrada Pathak",
      teacherCode: "SP",
    },
  ],
  WEDNESDAY: [
    {
      time: "07:00 - 08:30 AM",
      subject: "Database Administration",
      teacher: "Saroj Shakya",
      teacherCode: "SS",
      details: "Lab C, Group A",
    },
    {
      time: "07:00 - 08:30 AM",
      subject: "Data Warehousing and Data Mining",
      teacher: "Shrada Pathak",
      teacherCode: "SP",
      details: "Lab D, Group B",
    },
    {
      time: "08:30 - 10:00 AM",
      subject: "Data Warehousing and Data Mining",
      teacher: "Shrada Pathak",
      teacherCode: "SP",
    },
  ],
  THURSDAY: [
    {
      time: "07:00 - 08:30 AM",
      subject: "Database Administration",
      teacher: "Saroj Shakya",
      teacherCode: "SS",
    },
    {
      time: "08:30 - 10:00 AM",
      subject: "Principles of Management",
      teacher: "Sahitya Shrestha",
      teacherCode: "STS",
    },
  ],
  FRIDAY: [
    {
      time: "07:00 - 08:30 AM",
      subject: "Database Administration",
      teacher: "Saroj Shakya",
      teacherCode: "SS",
    },
    {
      time: "08:30 - 10:00 AM",
      subject: "Project Work",
      teacher: "Sarita Neupane",
      teacherCode: "SN",
    },
  ],
  SATURDAY: [],
};
const dayIndex = new Date().getDay();
console.log(dayIndex);
const days: Days[] = Object.keys(schedule) as Days[];
const tomorrow = days[(dayIndex + 1) % days.length];

if (process.env.DISCORD_TOKEN === undefined) {
  throw new Error("DISCORD_TOKEN is not defined in environment variables");
}
function formatSchedule(day: Days) {
  const entries = schedule[day];
  return entries
    .map((entry) => {
      const details = entry.details ? ` [${entry.details}]` : "";
      return `${entry.time} - **${entry.subject}** by ${entry.teacher} (${entry.teacherCode})${details}`;
    })
    .join("\n");
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on(Events.MessageCreate, async (message) => {
  console.log(
    `Received message: ${message.content} from ${message.author.tag} in ${message.channel.id}`
  );
  if (message.author.bot) return;
  if (message.content === "!routine") {
    try {
      if (tomorrow === "SATURDAY") {
        await message.channel.send(
          `📅 **Schedule for ${tomorrow}:**\nNo classes scheduled! Enjoy your day off! 🎉`
        );
        return;
      }
      const scheduleMessage = formatSchedule(tomorrow as Days);
      await message.channel.send(
        `📅 **Schedule for ${tomorrow}:**\n${scheduleMessage}`
      );
    } catch (error) {
      await message.channel.send(
        "Sorry, I couldn't fetch the schedule at the moment."
      );
      console.error("Error fetching schedule:", error);
    }
  }
});

cron.schedule(
  "0 20 * * *",
  async () => {
    console.log("Running daily at 8:30 PM");

    const generalChannel = await client.channels.fetch("1456214094737707129");
    if (generalChannel?.isSendable()) {
      try {
        if (tomorrow === "SATURDAY") {
          await generalChannel.send(
            `📅 **Schedule for ${tomorrow}:**\nNo classes scheduled! Enjoy your day off! 🎉`
          );
          return;
        }
        const scheduleMessage = formatSchedule(tomorrow as Days);
        await generalChannel.send(
          `📅 **Schedule for ${tomorrow}:**\n${scheduleMessage}`
        );
      } catch (error) {
        await generalChannel.send(
          "Sorry, I couldn't fetch the schedule at the moment."
        );
        console.error("Error fetching schedule:", error);
      }
    }
  },
  {
    timezone: "Asia/Kathmandu",
  }
);

client.login(process.env.DISCORD_TOKEN);
