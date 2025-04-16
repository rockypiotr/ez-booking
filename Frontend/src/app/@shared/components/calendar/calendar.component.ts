import { style } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { CalendarEvent } from './models/calendar-event';
import { CalendarResource } from './models/calendar-resource';
import { CalendarSlot } from './models/calendar-slot';

type ViewMode = 'day' | 'week' | 'month';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, Button, FormsModule, Select],
  templateUrl: './calendar.component.html',
  standalone: true,
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  @Input() resources: CalendarResource[] = [];
  @Input() events: CalendarEvent[] = [];
  @Input() workingHours: string[] = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);
  @Input() initialDate: Date = new Date();
  @Input() customWeekdays: string[] | null = null;
  @Output() slotClicked = new EventEmitter<CalendarSlot>();

  currentDate = signal(this.initialDate);
  selectedResource = signal<string | null>(null);
  viewMode = signal<ViewMode>('day');
  currentYear = computed(() => this.currentDate().getFullYear());

  currentTimePosition = computed(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const startHour = parseInt(this.workingHours[0].split(':')[0], 10);
    const slotHeight = 60;
    const hoursFromStart = currentHour - startHour + currentMinutes / 60;
    return hoursFromStart >= 0 && hoursFromStart <= this.workingHours.length
      ? hoursFromStart * slotHeight
      : -1;
  });

  daysInView = computed(() => {
    const date = this.currentDate();

    switch (this.viewMode()) {
      case 'day':
        return this.getDayView(date);
      case 'week':
        return this.getWeekView(date);
      case 'month':
        return this.getMonthView(date);
    }
  });
  protected readonly style = style;
  private readonly translateService = inject(TranslateService);
  private readonly locale: string = this.translateService.currentLang;
  weekdays = computed(() => {
    if (this.customWeekdays) {
      return this.customWeekdays;
    }
    return Array.from({ length: 7 }, (_, i) =>
      new Intl.DateTimeFormat(this.locale, { weekday: 'short' }).format(new Date(2023, 0, 2 + i))
    );
  });
  currentMonthName = computed(() =>
    this.currentDate().toLocaleString(this.locale, { month: 'long' })
  );

  setViewMode(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  previousPeriod(): void {
    this.currentDate.update((date) => this.shiftPeriod(date, -1));
  }

  nextPeriod(): void {
    this.currentDate.update((date) => this.shiftPeriod(date, 1));
  }

  getEventsForDay(date: Date) {
    const selectedResourceId = this.selectedResource();
    return this.events.filter((event) => {
      const isSameDay = event.date.toDateString() === date.toDateString();
      return isSameDay && (!selectedResourceId || event.resourceId === selectedResourceId);
    });
  }

  getEventsForDayAndHour(date: Date, hour: string) {
    const selectedResourceId = this.selectedResource();
    return this.events.filter((event) => {
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
      (this.viewMode() === 'day' && this.isToday(this.currentDate())) ||
      (this.viewMode() === 'week' && this.isToday(date))
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

  private shiftPeriod(date: Date, direction: number): Date {
    const newDate = new Date(date);
    if (this.viewMode() === 'month') {
      newDate.setMonth(date.getMonth() + direction);
    } else if (this.viewMode() === 'week') {
      newDate.setDate(date.getDate() + direction * 7);
    } else {
      newDate.setDate(date.getDate() + direction);
    }
    return newDate;
  }
}
