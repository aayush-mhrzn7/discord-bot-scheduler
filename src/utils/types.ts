type Days =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";
type ValidCommands = "!today" | "!routine" | "!help";
interface ScheduleEntry {
  time: string;
  subject: string;
  teacher?: string;
  teacherCode?: string;
  details?: string;
}

type Schedule = Record<Days, ScheduleEntry[]>;

export type { Schedule, ScheduleEntry, Days, ValidCommands };
