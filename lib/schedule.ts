export const dayLabels = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export interface ScheduleSlot {
  dayOfWeek: number | null;
  startTime: string | null;
  endTime: string | null;
}

export function hasSchedule(slot: ScheduleSlot): boolean {
  return slot.dayOfWeek !== null && !!slot.startTime && !!slot.endTime;
}

export function formatSchedule(slot: ScheduleSlot): string | null {
  if (!hasSchedule(slot) || slot.dayOfWeek === null) return null;
  return `${dayLabels[slot.dayOfWeek] ?? "?"} ${slot.startTime}–${slot.endTime}`;
}

export function slotsOverlap(a: ScheduleSlot, b: ScheduleSlot): boolean {
  if (!hasSchedule(a) || !hasSchedule(b)) return false;
  if (a.dayOfWeek !== b.dayOfWeek) return false;
  return a.startTime! < b.endTime! && b.startTime! < a.endTime!;
}
