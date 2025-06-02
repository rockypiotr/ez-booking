import { ChangeDetectionStrategy, Component, computed, inject, input, model } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { CalendarViewMode } from '../../models/calendar-view-mode';

@Component({
  selector: 'app-calendar-period',
  imports: [Button],
  templateUrl: './calendar-period.component.html',
  styleUrl: './calendar-period.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPeriodComponent {
  selectedDate = model.required<Date>();
  viewMode = input.required<CalendarViewMode>();
  currentYear = computed(() => this.selectedDate().getFullYear());
  protected readonly CalendarViewMode = CalendarViewMode;
  private readonly translateService = inject(TranslateService);
  private readonly locale: string = this.translateService.currentLang;
  currentMonthName = computed(() =>
    this.selectedDate().toLocaleString(this.locale, { month: 'long' })
  );

  protected previousPeriod(): void {
    this.selectedDate.update((date: Date) => this.shiftPeriod(date, -1));
  }

  protected nextPeriod(): void {
    this.selectedDate.update((date: Date) => this.shiftPeriod(date, 1));
  }

  private shiftPeriod(date: Date, direction: 1 | -1): Date {
    const newDate = new Date(date);

    switch (this.viewMode()) {
      case CalendarViewMode.MONTH:
        newDate.setMonth(date.getMonth() + direction);
        break;
      case CalendarViewMode.WEEK:
        newDate.setDate(date.getDate() + direction * 7);
        break;
      case CalendarViewMode.DAY:
        newDate.setDate(date.getDate() + direction);
        break;
    }

    return newDate;
  }
}
