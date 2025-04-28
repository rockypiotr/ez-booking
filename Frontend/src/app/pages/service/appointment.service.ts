import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  CreateAppointmentRequest,
  CreateAppointmentResponse,
} from '../../@shared/models/appointment';
import { EmployeeSelectorOption } from '../../@shared/models/employee-selector';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);

  createForm() {
    return this.fb.group({
      client_id: [null, [Validators.required]],
      service_id: [null, [Validators.required]],
      employee_id: [null, [Validators.required]],
      service_date: [null, [Validators.required]],
      service_time: [null, [Validators.required]],
      notes: [null, []],
    });
  }

  createAppointment(
    appointmentData: CreateAppointmentRequest
  ): Observable<CreateAppointmentResponse> {
    return this.http.post<CreateAppointmentResponse>(`${this.apiUrl}`, appointmentData);
  }

  getEnums(): Observable<{
    serviceTypes: string[];
    employees: EmployeeSelectorOption[];
  }> {
    return of({
      serviceTypes: ['Strzyżenie', 'Paznokcie'],
      employees: [
        {
          label: 'Karolina',
          imgUrl: 'https://primefaces.org/cdn/primevue/images/landing/apps/avatar1.png',
          id: '1',
        },
        {
          label: 'Ania',
          imgUrl: 'https://primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
          id: '2',
        },
        {
          label: 'Judyta',
          imgUrl: 'https://primefaces.org/cdn/primevue/images/landing/apps/avatar3.png',
          id: '3',
        },
        {
          label: 'Agata',
          imgUrl: 'https://primefaces.org/cdn/primevue/images/landing/apps/avatar4.png',
          id: '4',
        },
      ],
    });
  }

  getAvailableVisits(): Observable<string[]> {
    // return this.http.post<AvailableAppointmentsResponse>(
    //   `${this.apiUrl}/appointment/available-visits`,
    //   appointmentData
    // );
    return of(['10:20', '11:20', '15:30', '15:45', '16:00']);
  }
}
