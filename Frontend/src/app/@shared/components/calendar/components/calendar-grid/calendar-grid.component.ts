import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
  Signal,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CalendarEvent } from '../../models/calendar-event';
import { CalendarViewMode } from '../../models/calendar-view-mode';
import { EventsFilterPipe } from '../../pipes/events-filter.pipe';
import { EventsForDayFilterPipe } from '../../pipes/events-for-day-filter.pipe';
import { ExtractMinutesPipe } from '../../pipes/extract-minutes.pipe';
import { WeekdayNamePipe } from '../../pipes/weekday-name.pipe';

@Component({
  selector: 'app-calendar-grid',
  imports: [
    EventsFilterPipe,
    EventsForDayFilterPipe,
    WeekdayNamePipe,
    CommonModule,
    ExtractMinutesPipe,
  ],
  templateUrl: './calendar-grid.component.html',
  styleUrl: './calendar-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarGridComponent {
  workingHours = input.required<string[]>();
  viewMode = input.required<CalendarViewMode>();
  selectedResource = input.required<string | null>();
  selectedDate = model<Date>(new Date());
  customWeekdays = input.required<string[] | null>();
  slotClicked = output<{ date: Date; hour?: string }>();
  events = input.required<CalendarEvent[]>();

  daysInView = computed(() => {
    const date = this.selectedDate();

    switch (this.viewMode()) {
      case CalendarViewMode.DAY:
        return this.getDayView(date);
      case CalendarViewMode.WEEK:
        return this.getWeekView(date);
      case CalendarViewMode.MONTH:
        return this.getMonthView(date);
      default:
        throw new Error('Unknown view mode');
    }
  });
  currentTimePosition = computed(() => this.getCurrentTimePosition());
  protected readonly CalendarViewMode = CalendarViewMode;
  private readonly translateService = inject(TranslateService);
  private readonly locale: string = this.translateService.currentLang;
  weekdays: Signal<string[]> = computed(() => {
    if (this.customWeekdays()) return this.customWeekdays() as string[];

    return Array.from({ length: 7 }, (_, i) =>
      new Intl.DateTimeFormat(this.locale, { weekday: 'short' }).format(new Date(2023, 0, 2 + i))
    );
  });

  shouldShowTimeLine(date: Date): boolean {
    return (
      (this.viewMode() === CalendarViewMode.DAY && this.isToday(this.selectedDate())) ||
      (this.viewMode() === CalendarViewMode.WEEK && this.isToday(date))
    );
  }

  isToday(date: Date): boolean {
    const now = new Date();
    return now.toDateString() === date.toDateString();
  }

  onSlotClicked(date: Date, hour: string): void {
    this.slotClicked.emit({ date, hour });
  }

  private getDayView(date: Date) {
    return [{ number: date.getDate(), date: new Date(date), isCurrentMonth: true }];
  }

  private getWeekView(date: Date) {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay() || 7;
    startOfWeek.setDate(date.getDate() - (dayOfWeek - 1));

    return Array.from({ length: 7 }, (_, i) => {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      return {
        number: currentDate.getDate(),
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === date.getMonth(),
      };
    });
  }

  private getMonthView(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    const startDay = firstDay.getDay() || 7;
    const prevMonthDays = startDay - 1;

    for (let i = prevMonthDays; i > 0; i--) {
      const prevDate = new Date(year, month, 1 - i);
      days.push({ number: prevDate.getDate(), date: prevDate, isCurrentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({ number: i, date: currentDate, isCurrentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ number: i, date: nextDate, isCurrentMonth: false });
    }

    return days;
  }

  private getCurrentTimePosition() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const startHour: number = parseInt(this.workingHours()[0].split(':')[0], 10);
    const slotHeight = 60;
    const hoursFromStart: number = currentHour - startHour + currentMinutes / 60;

    return hoursFromStart >= 0 && hoursFromStart <= this.workingHours().length
      ? hoursFromStart * slotHeight
      : -1;
  }
}
