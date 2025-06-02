import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventsFilter',
})
export class EventsFilterPipe implements PipeTransform {
  transform(events: any[], date: Date, hour: string, selectedResourceId: string | null): any[] {
    return events.filter((event) => {
      const isSameDay = event.date.toDateString() === date.toDateString();
      const isSameHour = event.time === hour;
      const matchesResource = !selectedResourceId || event.resourceId === selectedResourceId;

      return isSameDay && isSameHour && matchesResource;
    });
  }
}
