import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, model, output, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CalendarNavigationComponent } from './components/calendar-navigation/calendar-navigation.component';
import { CalendarEvent } from './models/calendar-event';
import { CalendarResource } from './models/calendar-resource';
import { CalendarSlot } from './models/calendar-slot';
import { CalendarViewMode } from './models/calendar-view-mode';

@Component({
  selector: 'app-event-calendar',
  imports: [CommonModule, FormsModule, CalendarNavigationComponent],
  templateUrl: './event-calendar.component.html',
  standalone: true,
  styleUrl: './event-calendar.component.scss',
})
export class EventCalendarComponent {
  employers = input.required<CalendarResource[]>();
  events = input<CalendarEvent[]>([]);
  workingHours = input<string[]>(Array.from({ length: 18 }, (_, i) => `${i + 6}:00`));
  selectedDate = model<Date>(new Date());
  customWeekdays = input<string[] | null>(null);
  slotClicked = output<CalendarSlot>();
  selectedResource = signal<string | null>(null);
  viewMode = signal<CalendarViewMode>(CalendarViewMode.DAY);
  currentTimePosition = computed(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const startHour = parseInt(this.workingHours()[0].split(':')[0], 10);
    const slotHeight = 60;
    const hoursFromStart = currentHour - startHour + currentMinutes / 60;
    return hoursFromStart >= 0 && hoursFromStart <= this.workingHours.length
      ? hoursFromStart * slotHeight
      : -1;
  });
  daysInView = computed(() => {
    const date = this.selectedDate();

    switch (this.viewMode()) {
      case CalendarViewMode.DAY:
        return this.getDayView(date);
      case CalendarViewMode.WEEK:
        return this.getWeekView(date);
      case CalendarViewMode.MONTH:
        return this.getMonthView(date);
    }
  });
  protected readonly CalendarViewMode = CalendarViewMode;
  private readonly translateService = inject(TranslateService);
  private readonly locale: string = this.translateService.currentLang;
  weekdays: Signal<string[]> = computed(() => {
    if (this.customWeekdays()) return this.customWeekdays() as string[];

    return Array.from({ length: 7 }, (_, i) =>
      new Intl.DateTimeFormat(this.locale, { weekday: 'short' }).format(new Date(2023, 0, 2 + i))
    );
  });

  getEventsForDay(date: Date) {
    const selectedResourceId = this.selectedResource();
    return this.events().filter((event) => {
      const isSameDay = event.date.toDateString() === date.toDateString();
      return isSameDay && (!selectedResourceId || event.resourceId === selectedResourceId);
    });
  }

  getEventsForDayAndHour(date: Date, hour: string) {
    const selectedResourceId = this.selectedResource();
    return this.events().filter((event: any) => {
      const isSameDay = event.date.toDateString() === date.toDateString();
      const isSameHour = event.time === hour;
      return (
        isSameDay && isSameHour && (!selectedResourceId || event.resourceId === selectedResourceId)
      );
    });
  }

  openSlotDialog(date: Date, hour?: string): void {
    this.slotClicked.emit({ date, hour });
  }

  isToday(date: Date): boolean {
    const now = new Date();
    return now.toDateString() === date.toDateString();
  }

  shouldShowTimeLine(date: Date): boolean {
    return (
      (this.viewMode() === CalendarViewMode.DAY && this.isToday(this.selectedDate())) ||
      (this.viewMode() === CalendarViewMode.WEEK && this.isToday(date))
    );
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
}
