import type { Schedule } from "./utils/types.js";

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

export default schedule;
