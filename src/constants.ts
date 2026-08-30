import type { Schedule } from "./utils/types.js";

const schedule: Schedule = {
  SUNDAY: [],
  MONDAY: [
    {
      time: "07:00 - 08:30 AM",
      subject: "Introduction to Cloud Computing",
      teacher: "HM",
      teacherCode: "HM",
    },
    {
      time: "08:30 - 10:00 AM",
      subject: "International Business",
      teacher: "Sahitya Shrestha",
      teacherCode: "SSh",
    },
  ],
  TUESDAY: [
    {
      time: "07:00 - 08:30 AM",
      subject: "Advanced Database",
      teacher: "Saroja Bhandari",
      teacherCode: "SB",
      details: "Lab D, Group A",
    },
    {
      time: "07:00 - 08:30 AM",
      subject: "Introduction to Cloud Computing",
      teacher: "HM",
      teacherCode: "HM",
      details: "Lab A, Group B",
    },
    {
      time: "08:30 - 09:30 AM",
      subject: "Internship",
    },
  ],
  WEDNESDAY: [
    {
      time: "07:00 - 08:30 AM",
      subject: "Advanced Database",
      teacher: "Saroja Bhandari",
      teacherCode: "SB",
    },
    {
      time: "08:30 - 10:00 AM",
      subject: "Self-Study Time",
    },
  ],
  THURSDAY: [
    {
      time: "07:00 - 08:30 AM",
      subject: "Advanced Database",
      teacher: "Saroja Bhandari",
      teacherCode: "SB",
      details: "Lab D, Group B",
    },
    {
      time: "07:00 - 08:30 AM",
      subject: "Introduction to Cloud Computing",
      teacher: "HM",
      teacherCode: "HM",
      details: "Lab A, Group A",
    },
    {
      time: "08:30 - 10:00 AM",
      subject: "International Business",
      teacher: "Sahitya Shrestha",
      teacherCode: "SSh",
    },
  ],
  FRIDAY: [
    {
      time: "07:00 - 08:30 AM",
      subject: "Advanced Database",
      teacher: "Saroja Bhandari",
      teacherCode: "SB",
    },
    {
      time: "08:30 - 10:00 AM",
      subject: "Introduction to Cloud Computing",
      teacher: "HM",
      teacherCode: "HM",
    },
  ],
  SATURDAY: [],
};

export default schedule;
