import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { Fluid } from 'primeng/fluid';
import { Ripple } from 'primeng/ripple';
import { Select } from 'primeng/select';
import { tap } from 'rxjs';
import {
  AvailableAppointmentsRequest,
  AvailableAppointmentsResponse,
  CreateAppointmentRequest,
} from '../../../@shared/api/appointment';
import { EmployeeSelectorOption } from '../../../@shared/api/employee-selector';
import { BaseModalComponent } from '../../../components/base-modal/base-modal.component';
import { EmployeeSelectorComponent } from '../../../components/employee-selector/employee-selector.component';
import { TimePickerComponent } from '../../../components/time-picker/time-picker.component';
import { AppointmentService } from '../../service/appointment.service';

@Component({
  selector: 'app-appointment-modal',
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    Fluid,
    ButtonDirective,
    Ripple,
    EmployeeSelectorComponent,
    DatePicker,
    Select,
    TimePickerComponent,
  ],
  templateUrl: './appointment-modal.component.html',
  styleUrl: './appointment-modal.component.scss',
})
export class AppointmentModalComponent extends BaseModalComponent implements OnInit {
  serviceTypes: any[] | undefined;
  employees!: EmployeeSelectorOption[];
  availableTime: AvailableAppointmentsResponse = [];

  readonly now = new Date();

  private readonly appointmentService = inject(AppointmentService);

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setEnums();
  }

  onSave(): void {
    this.validateForm();
    this.createAppointment();
  }

  getAvailableTime() {
    this.appointmentService
      .getAvailableVisits(this.getAvailableAppointmentsPayload())
      .pipe(tap((availableTime) => (this.availableTime = availableTime)))
      .subscribe();
  }

  createForm(): void {
    this.form = this.fb.group({
      employee: [null, [Validators.required]],
      serviceType: [null, [Validators.required]],
      appointmentData: this.fb.group({
        date: [null, [Validators.required]],
        time: [null, [Validators.required]],
      }),
    });

    console.log('form', this.form.getRawValue());
  }

  validateForm() {
    if (this.form.invalid) {
      throw new Error('Invalid form');
    }
  }

  private setEnums(): void {
    this.appointmentService
      .getEnums()
      .pipe(
        tap(({ serviceTypes, employees }) => {
          this.serviceTypes = serviceTypes;
          this.employees = employees;
        })
      )
      .subscribe();
  }

  private createAppointment() {
    this.appointmentService
      .createAppointment(this.getCreateAppointmentPayload())
      .pipe()
      .subscribe();
  }

  private getCreateAppointmentPayload(): CreateAppointmentRequest {
    return this.form.getRawValue();
  }

  private getAvailableAppointmentsPayload(): AvailableAppointmentsRequest {
    const { employee, appointmentData } = this.form.getRawValue();

    return {
      appointmentDate: appointmentData.date.toString(),
      employeeId: employee.id,
    };
  }
}
