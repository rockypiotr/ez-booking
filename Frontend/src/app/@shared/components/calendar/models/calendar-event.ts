export interface CalendarEvent {
  id: string;
  date: Date;
  time: string;
  duration: number;
  resourceId: string | number;
  title: string;
}
