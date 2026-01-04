import type { Client, ClientEvents } from "discord.js";
import schedule from "./constants.js";
import type { Days, Schedule } from "./utils/types.js";

const getRoutine = async (day: keyof Schedule, message: any) => {
  const scheduleMessage = formatSchedule(day);
  await message.channel.send(`📅 **Schedule for ${day}:**\n${scheduleMessage}`);
};
function formatSchedule(day: Days) {
  const entries = schedule[day];
  return entries
    .map((entry) => {
      const details = entry.details ? ` [${entry.details}]` : "";
      return `${entry.time} - **${entry.subject}** by ${entry.teacher} (${entry.teacherCode})${details}`;
    })
    .join("\n");
}
const cronFunctionToGetRoutineOfTommorrow = async (
  client: Client,
  day: keyof Schedule
) => {
  const generalChannel = await client.channels.fetch("1456214094737707129");
  if (generalChannel?.isSendable()) {
    try {
      if (day === "SATURDAY") {
        await generalChannel.send(
          `📅 **Schedule for ${day}:**\nNo classes scheduled! Enjoy your day off! 🎉`
        );
        return;
      }
      const scheduleMessage = formatSchedule(day as Days);
      await generalChannel.send(
        `📅 **Schedule for ${day}:**\n${scheduleMessage}`
      );
    } catch (error) {
      await generalChannel.send(
        "Sorry, I couldn't fetch the schedule at the moment."
      );
      console.error("Error fetching schedule:", error);
    }
  }
};
export { formatSchedule, getRoutine, cronFunctionToGetRoutineOfTommorrow };
