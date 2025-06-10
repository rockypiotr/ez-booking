import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from '../models/calendar-event';

@Pipe({
  name: 'eventsFilter',
})
export class EventsFilterPipe implements PipeTransform {
  transform(
    events: CalendarEvent[],
    date: Date,
    time: string,
    selectedResourceId: string | null
  ): CalendarEvent[] {
    return events.filter((event: CalendarEvent) => {
      const isSameDay = event.date.toDateString() === date.toDateString();
      const eventHour = this.getHour(event.time);
      const itemHour = this.getHour(time);
      const isSameHour = eventHour === itemHour;
      
      const matchesResource = !selectedResourceId || event.resourceId === selectedResourceId;

      return isSameDay && isSameHour && matchesResource;
    });
  }

  private getHour(time: string): string {
    return time.split(':')[0];
  }
}
