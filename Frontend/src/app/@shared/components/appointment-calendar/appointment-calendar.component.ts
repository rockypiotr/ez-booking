import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { add } from 'date-fns';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { EMPLOYERS } from '../appointment-modal/appointment-modal.data';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarEvent } from '../calendar/models/calendar-event';
import { CalendarResource } from '../calendar/models/calendar-resource';
import { CalendarSlot } from '../calendar/models/calendar-slot';

@Component({
  selector: 'app-appointment-calendar',
  imports: [CalendarComponent, DynamicDialogModule],
  providers: [DialogService, TranslateService],
  templateUrl: './appointment-calendar.component.html',
  styleUrl: './appointment-calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentCalendarComponent implements OnDestroy, OnInit {
  resources: CalendarResource[] = [];
  events: CalendarEvent[] = [
    {
      id: '1',
      date: add(new Date(), { hours: -5 }),
      time: '10:00',
      resourceId: '101',
      title: 'Test app',
      duration: 60,
    },
  ];
  private readonly translateService = inject(TranslateService);
  private readonly dialogService = inject(DialogService);
  private ref: DynamicDialogRef<AppointmentModalComponent> | undefined;

  ngOnInit() {
    this.setResources();
  }

  ngOnDestroy() {
    if (this.ref) this.ref.close();
  }

  processAppointment(event: CalendarSlot) {
    this.ref = this.dialogService.open(AppointmentModalComponent, {
      header: this.getDialogHeader(),
      data: event,
      width: '40rem',
      modal: true,
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
    });

    this.ref.onClose.subscribe((event: CalendarEvent) => {
      if (event) this.events.push(event);
    });
  }

  getDialogHeader() {
    return this.translateService.instant('appointment.modal.header.new');
  }

  private setResources() {
    this.resources = EMPLOYERS.map(({ user_id: id, first_name, last_name }) => ({
      id: id.toString(),
      name: first_name + ' ' + last_name,
    }));
  }
}
