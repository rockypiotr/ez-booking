import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractMinutes',
})
export class ExtractMinutesPipe implements PipeTransform {
  transform(time: string): number {
    return Number(time.split(':')[1]);
  }
}
