import { Client, GatewayIntentBits, Events } from "discord.js";
import cron from "node-cron";
import dotenv from "dotenv";
import {
  cronFunctionToGetRoutineOfTommorrow,
  formatSchedule,
  getRoutine,
} from "./commands.js";
import type { Days } from "./utils/types.js";
import schedule from "./constants.js";
dotenv.config();

const dayIndex = new Date().getDay();
const days: Days[] = Object.keys(schedule) as Days[];
const tomorrow = days[(dayIndex + 1) % days.length];
const today = days[dayIndex % days.length];

if (process.env.DISCORD_TOKEN === undefined) {
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
  if (message.content == "!help") {
    try {
      await message.channel.send(
        "Hey Looks like you need some help with the commands here you go. \n 1. !today (Get the Routine of Today) \n 2. !tommorrow (Get Routine of Tommorrow)"
      );
    } catch (error) {
      await message.channel.send(
        "Sorry, I couldn't fetch the schedule at the moment."
      );
    }
  }
  if (message.content == "ping") {
    try {
      await message.channel.send("pong");
    } catch (error) {
      await message.channel.send(
        "Sorry, I couldn't fetch the schedule at the moment."
      );
    }
  }
  if (message.content === "!today") {
    try {
      if (today === "SATURDAY") {
        await message.channel.send(
          `📅 **Schedule for ${today}:**\nNo classes scheduled! Enjoy your day off! 🎉`
        );
        return;
      }
      getRoutine(today as Days, message);
    } catch (error) {
      await message.channel.send(
        "Sorry, I couldn't fetch the schedule at the moment."
      );
    }
  }
  if (message.content === "!tommorrow") {
    try {
      if (tomorrow === "SATURDAY") {
        await message.channel.send(
          `📅 **Schedule for ${tomorrow}:**\nNo classes scheduled! Enjoy your day off! 🎉`
        );
        return;
      }
      getRoutine(tomorrow as Days, message);
    } catch (error) {
      await message.channel.send(
        "Sorry, I couldn't fetch the schedule at the moment."
      );
    }
  }
});

cron.schedule(
  "0 20 * * *",
  async () => {
    cronFunctionToGetRoutineOfTommorrow(client, tomorrow as Days);
  },
  {
    timezone: "Asia/Kathmandu",
  }
);

client.login(process.env.DISCORD_TOKEN);
