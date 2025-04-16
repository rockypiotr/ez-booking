import { Component } from '@angular/core';
import { AppointmentCalendarComponent } from '../../@shared/components/appointment-calendar/appointment-calendar.component';

@Component({
  selector: 'app-dashboard',
  imports: [AppointmentCalendarComponent],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
