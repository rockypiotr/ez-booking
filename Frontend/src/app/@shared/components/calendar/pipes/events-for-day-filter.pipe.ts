import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventsForDayFilter',
})
export class EventsForDayFilterPipe implements PipeTransform {
  transform(events: any[], date: Date, selectedResourceId: string | null): any[] {
    if (!events || !date) {
      return [];
    }

    const targetDateString = date.toDateString();

    return events.filter((event) => {
      const eventDate = event.date instanceof Date ? event.date : new Date(event.date);
      const isSameDay = eventDate.toDateString() === targetDateString;
      const matchesResource = !selectedResourceId || event.resourceId === selectedResourceId;

      return isSameDay && matchesResource;
    });
  }
}
