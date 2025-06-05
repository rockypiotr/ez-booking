import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from '../models/calendar-event';

@Pipe({
  name: 'eventsFilter',
})
export class EventsFilterPipe implements PipeTransform {
  transform(events: any[], date: Date, time: string, selectedResourceId: string | null): any[] {
    return events.filter((event: CalendarEvent) => {
      const isSameDay = event.date.toDateString() === date.toDateString();
      const eventHour = event.time.split(':')[0];
      const itemHour = time.split(':')[0];
      const isSameHour = eventHour === itemHour;
      console.log('hour', time);
      const matchesResource = !selectedResourceId || event.resourceId === selectedResourceId;

      return isSameDay && isSameHour && matchesResource;
    });
  }
}
