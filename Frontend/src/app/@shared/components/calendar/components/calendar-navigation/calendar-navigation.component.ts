import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MultiSelect } from 'primeng/multiselect';
import { SelectButton } from 'primeng/selectbutton';
import { CalendarResource } from '../../models/calendar-resource';
import { CalendarViewMode } from '../../models/calendar-view-mode';
import { CalendarPeriodComponent } from '../calendar-period/calendar-period.component';

@Component({
  selector: 'app-calendar-navigation',
  imports: [CalendarPeriodComponent, MultiSelect, SelectButton, TranslatePipe, FormsModule],
  standalone: true,
  templateUrl: './calendar-navigation.component.html',
  styleUrl: './calendar-navigation.component.scss',
})
export class CalendarNavigationComponent {
  selectedDate = model.required<Date>();
  viewMode = model.required<CalendarViewMode>();
  employers = input<CalendarResource[]>([]);
  selectedEmployers = model<CalendarResource>();
  protected readonly viewModes = Object.values(CalendarViewMode);
}
