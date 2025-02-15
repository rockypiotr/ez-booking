import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AvailableAppointmentsRequest,
  AvailableAppointmentsResponse,
  CreateAppointmentRequest,
  CreateAppointmentResponse,
} from '../../@shared/api/appointment';
import { EmployeeSelectorOption } from '../../@shared/api/employee-selector';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

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

  getAvailableVisits(
    appointmentData: AvailableAppointmentsRequest
  ): Observable<AvailableAppointmentsResponse> {
    // return this.http.post<AvailableAppointmentsResponse>(
    //   `${this.apiUrl}/appointment/available-visits`,
    //   appointmentData
    // );
    return of(['10:20', '11:20', '15:30', '15:45', '16:00']);
  }
}
