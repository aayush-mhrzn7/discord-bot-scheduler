import type { Client } from "discord.js";
import schedule from "./constants.js";
import type { Days, Schedule } from "./utils/types.js";

const getRoutine = async (day: keyof Schedule, message: any) => {
  const scheduleMessage = formatSchedule(day);
  await message.channel.send(`📅 **Schedule for ${day}:**\n${scheduleMessage}`);
};

function formatSchedule(day: Days) {
  const entries = schedule[day];
  if (!entries.length) {
    return "No classes scheduled! Enjoy your day off! 🎉";
  }
  return entries
    .map((entry) => {
      const details = entry.details ? ` [${entry.details}]` : "";
      const byline = entry.teacher
        ? ` by ${entry.teacher}${entry.teacherCode ? ` (${entry.teacherCode})` : ""}`
        : "";
      return `${entry.time} - **${entry.subject}**${byline}${details}`;
    })
    .join("\n");
}

async function postViaWebhook(content: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("DISCORD_WEBHOOK_URL is not defined in environment variables");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Webhook failed (${response.status}): ${body}`);
  }
}

const cronFunctionToGetRoutineOfTommorrow = async (
  _client: Client,
  day: keyof Schedule,
) => {
  const content = `📅 **Schedule for ${day}:**\n${formatSchedule(day as Days)}`;
  try {
    await postViaWebhook(content);
  } catch (error) {
    console.error("Error posting schedule via webhook:", error);
    try {
      await postViaWebhook(
        "Sorry, I couldn't fetch the schedule at the moment.",
      );
    } catch (fallbackError) {
      console.error("Error posting fallback via webhook:", fallbackError);
    }
  }
};

export { formatSchedule, getRoutine, cronFunctionToGetRoutineOfTommorrow };
