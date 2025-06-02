import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekdayName',
})
export class WeekdayNamePipe implements PipeTransform {
  transform(date: Date, weekdays: string[]): string {
    const dayIndex = date.getDay();
    return weekdays[dayIndex === 0 ? 6 : dayIndex - 1];
  }
}
