import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeTemplate } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { Chip } from 'primeng/chip';
import { DatePicker } from 'primeng/datepicker';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { tap } from 'rxjs';
import { AppointmentService } from '../../../pages/service/appointment.service';
import { CalendarEvent } from '../calendar/models/calendar-event';
import { CLIENTS, EMPLOYERS, SERVICES } from './appointment-modal.data';
import { Client, ClientAddRequest } from '../../models/client';
import { ClientAddModalComponent } from '../client-add-modal/client-add-modal.component';

@Component({
  selector: 'app-appointment-modal',
  imports: [
    Select,
    Chip,
    Textarea,
    ButtonDirective,
    FormsModule,
    PrimeTemplate,
    ReactiveFormsModule,
    DatePicker,
  ],
  providers: [],
  templateUrl: './appointment-modal.component.html',
  styleUrl: './appointment-modal.component.scss',
})
export class AppointmentModalComponent implements OnInit {
  clients = [] as ClientAddRequest[];
  employers = EMPLOYERS;
  services = SERVICES;
  availableVisits: string[] = [];
  form!: FormGroup;

  private readonly appointmentService = inject(AppointmentService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogConfig = inject(DynamicDialogConfig);
  private dialogRef = inject(DynamicDialogRef);
  private readonly dialogService = inject(DialogService);
  private readonly changedecectorref = inject(ChangeDetectorRef);

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
  
  toggleNewClientForm(){
    const clientDialogRef: DynamicDialogRef = this.dialogService.open(ClientAddModalComponent, {
      header: 'Dodaj nowego klienta', //TODO
      width: '40rem',
      modal: true,
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
    })

    clientDialogRef.onClose
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((newClient: Client) => {
      if (newClient) {
        this.clients = [...this.clients, newClient];
        this.form.get('client_id')?.setValue(newClient.clientId);
      }
    });
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
