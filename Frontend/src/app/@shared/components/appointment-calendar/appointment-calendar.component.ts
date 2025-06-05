import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { add } from 'date-fns';
import { Card } from 'primeng/card';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter } from 'rxjs/operators';
import { ToastService } from '../../../@core/services/common/toast.service';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { EMPLOYERS } from '../appointment-modal/appointment-modal.data';
import { EventCalendarComponent } from '../calendar/event-calendar.component';
import { CalendarEvent } from '../calendar/models/calendar-event';
import { CalendarResource } from '../calendar/models/calendar-resource';
import { CalendarSlot } from '../calendar/models/calendar-slot';

@Component({
  selector: 'app-appointment-calendar',
  imports: [EventCalendarComponent, DynamicDialogModule, Card],
  providers: [DialogService, TranslateService],
  templateUrl: './appointment-calendar.component.html',
  styleUrl: './appointment-calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentCalendarComponent implements OnDestroy, OnInit {
  employers = signal<CalendarResource[]>([]);
  appointments = signal<CalendarEvent[]>([
    {
      id: '1',
      date: add(new Date(), { hours: -5 }),
      time: '10:00',
      resourceId: '101',
      title: 'Test app',
      duration: 60,
    },
    {
      id: '2',
      date: add(new Date(), { hours: -5 }),
      time: '13:30',
      resourceId: '101',
      title: 'Test app',
      duration: 90,
    },
  ]);
  private readonly translateService = inject(TranslateService);
  private readonly dialogService = inject(DialogService);
  private readonly toastService = inject(ToastService);
  private ref: DynamicDialogRef<AppointmentModalComponent> | undefined;

  ngOnInit() {
    this.setResources();
  }

  ngOnDestroy() {
    if (this.ref) this.ref.close();
  }

  openAppointment(event: CalendarSlot) {
    this.ref = this.dialogService.open(AppointmentModalComponent, {
      header: this.getDialogHeader(),
      data: event,
      width: '40rem',
      modal: true,
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
    });

    this.ref.onClose.pipe(filter((event) => event)).subscribe((event: unknown) => {
      console.log('event', event);
      this.toastService.showSuccess('success');
      if (event)
        this.appointments.update((appointments) => [
          ...appointments,
          this.getAppointmentData(event),
        ]);
    });
  }

  getDialogHeader() {
    return this.translateService.instant('appointment.modal.header.new');
  }

  private setResources() {
    this.employers.set(
      EMPLOYERS.map(({ user_id: id, first_name, last_name }) => ({
        id: id.toString(),
        name: first_name + ' ' + last_name,
      }))
    );
  }

  private getAppointmentData(event: any): CalendarEvent {
    return {
      id: event.service_time,
      date: event.service_date,
      time: event.service_time || '13:00',
      resourceId: 101,
      title: event.notes,
      duration: 60,
    };
  }
}
