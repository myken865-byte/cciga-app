export const ATTENDANCE_ALERT_THRESHOLD = 3;

export const attendanceStatuses = ["present", "absent", "retard"] as const;

export type AttendanceStatus = (typeof attendanceStatuses)[number];

export const attendanceStatusLabels: Record<AttendanceStatus, string> = {
  present: "Présent",
  absent: "Absent",
  retard: "Retard",
};

export function isAttendanceStatus(value: string): value is AttendanceStatus {
  return (attendanceStatuses as readonly string[]).includes(value);
}
