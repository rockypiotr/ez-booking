import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeTemplate } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { Calendar } from 'primeng/calendar';
import { Chip } from 'primeng/chip';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { tap } from 'rxjs';
import { AppointmentService } from '../../../pages/service/appointment.service';
import { CalendarEvent } from '../calendar/models/calendar-event';
import { CLIENTS, EMPLOYERS, SERVICES } from './appointment-modal.data';

@Component({
  selector: 'app-appointment-modal',
  imports: [
    Select,
    Calendar,
    Chip,
    Textarea,
    ButtonDirective,
    FormsModule,
    PrimeTemplate,
    ReactiveFormsModule,
  ],
  providers: [],
  templateUrl: './appointment-modal.component.html',
  styleUrl: './appointment-modal.component.scss',
})
export class AppointmentModalComponent implements OnInit {
  clients = CLIENTS;
  employers = EMPLOYERS;
  services = SERVICES;
  availableVisits: string[] = [];
  form!: FormGroup;

  private readonly appointmentService = inject(AppointmentService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogConfig = inject(DynamicDialogConfig);
  private readonly dialogRef = inject(DynamicDialogRef);

  ngOnInit() {
    this.createForm();
    this.setDate();
  }

  onSave() {
    // this.validateForm();
    this.save();
  }

  setAvailableVisits() {
    this.appointmentService
      .getAvailableVisits()
      .pipe(
        tap((availableVisits) => (this.availableVisits = availableVisits)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private createForm() {
    this.form = this.appointmentService.createForm();
  }

  private setDate() {
    this.form.get('service_date')?.setValue(this.dialogConfig.data.date);
  }

  private getPayload(): CalendarEvent {
    return this.form.getRawValue();
  }

  private save() {
    this.dialogRef.close(this.getPayload());
  }

  private validateForm() {
    if (this.form.invalid) throw new Error('Invalid form');
  }
}
