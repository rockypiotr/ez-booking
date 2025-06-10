import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractMinutes',
})
export class ExtractMinutesPipe implements PipeTransform {
  transform(time: string): number {
    return Number(this.getMinutes(time));
  }

  getMinutes(time: string): string {
    return time.split(':')[1];
  }
}
