import { Client, GatewayIntentBits, Events } from "discord.js";
import cron from "node-cron";
import dotenv from "dotenv";
import { cronFunctionToGetRoutineOfTommorrow, getRoutine } from "./commands.js";
import schedule from "./constants.js";
import type { Days } from "./utils/types.js";

dotenv.config();

// We keep the keys globally so we don't re-create the array every time
const days = Object.keys(schedule);

if (!process.env.DISCORD_TOKEN) {
  throw new Error("DISCORD_TOKEN is not defined in environment variables");
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
  if (message.author.bot) return;

  const now = new Date();
  const dayIndex = now.getDay();
  const today = days[dayIndex % days.length];
  const tomorrow = days[(dayIndex + 1) % days.length];

  const content = message.content.toLowerCase();

  if (content === "!help") {
    await message.channel.send(
      "Hey! Here are the commands you can use:\n1. `!today` - Get today's routine\n2. `!tomorrow` - Get tomorrow's routine",
    );
  }

  if (content === "ping") {
    await message.channel.send("pong 🏓");
  }

  if (content === "!today") {
    try {
      if (today === "SATURDAY") {
        return await message.channel.send(
          `📅 **Schedule for ${today}:**\nNo classes! Enjoy your day off! 🎉`,
        );
      }
      await getRoutine(today as Days, message);
    } catch (error) {
      await message.channel.send(
        "Sorry, I couldn't fetch the schedule right now.",
      );
    }
  }

  if (content === "!tomorrow" || content === "!tommorrow") {
    try {
      if (tomorrow === "SATURDAY") {
        return await message.channel.send(
          `📅 **Schedule for ${tomorrow}:**\nNo classes! Enjoy your day off! 🎉`,
        );
      }
      await getRoutine(tomorrow as Days, message);
    } catch (error) {
      await message.channel.send(
        "Sorry, I couldn't fetch the schedule right now.",
      );
    }
  }
});

cron.schedule(
  "0 20 * * *",
  async () => {
    const now = new Date();
    const cronTomorrow = days[(now.getDay() + 1) % days.length];

    console.log(`Running cron for: ${cronTomorrow}`);
    cronFunctionToGetRoutineOfTommorrow(client, cronTomorrow as Days);
  },
  {
    timezone: "Asia/Kathmandu",
  },
);

client.login(process.env.DISCORD_TOKEN);
