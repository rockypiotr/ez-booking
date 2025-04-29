export interface BusinessHours {
  weeklySchedule: WeeklySchedule;
  specialClosureDays: SpecialClosureDay[];
  allowBookingsOutsideBusinessHours: boolean;
}

export interface WeeklySchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime: string; // Format: "HH:MM"
  closeTime: string; // Format: "HH:MM"
  breakStartTime?: string; // Format: "HH:MM"
  breakEndTime?: string; // Format: "HH:MM"
}

export interface SpecialClosureDay {
  id: string;
  date: string; // Format: "YYYY-MM-DD"
  name: string;
}
