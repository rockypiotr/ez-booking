import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarGridComponent } from './components/calendar-grid/calendar-grid.component';
import { CalendarNavigationComponent } from './components/calendar-navigation/calendar-navigation.component';
import { CalendarEvent } from './models/calendar-event';
import { CalendarResource } from './models/calendar-resource';
import { CalendarSlot } from './models/calendar-slot';
import { CalendarViewMode } from './models/calendar-view-mode';

@Component({
  selector: 'app-event-calendar',
  imports: [CommonModule, FormsModule, CalendarNavigationComponent, CalendarGridComponent],
  templateUrl: './event-calendar.component.html',
  standalone: true,
  styleUrl: './event-calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCalendarComponent {
  employers = input.required<CalendarResource[]>();
  events = input<CalendarEvent[]>([]);
  selectedDate = model<Date>(new Date());
  selectedResource = input<string | null>();
  customWeekdays = input<string[] | null>(null);
  slotClicked = output<CalendarSlot>();
  viewMode = signal<CalendarViewMode>(CalendarViewMode.DAY);
  workingHours = input<string[]>(Array.from({ length: 18 }, (_, i) => `${i + 6}:00`));

  openSlotDialog(data: { date: Date; hour?: string }): void {
    this.slotClicked.emit(data);
  }
}
