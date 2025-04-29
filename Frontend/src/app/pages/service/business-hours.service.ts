import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BusinessHours, SpecialClosureDay } from '../../@shared/models/business-hours';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessHoursService {
  private http = inject(HttpClient);

  getBusinessHours(): Observable<BusinessHours> {
    // In a real application, this would call an API endpoint
    // return this.http.get<BusinessHours>(`${environment.apiUrl}/business-hours`);

    // For now, return mock data
    return of(this.getMockBusinessHours());
  }

  updateBusinessHours(businessHours: BusinessHours): Observable<BusinessHours> {
    // In a real application, this would call an API endpoint
    // return this.http.put<BusinessHours>(`${environment.apiUrl}/business-hours`, businessHours);

    // For now, just return the input
    return of(businessHours);
  }

  addSpecialClosureDay(closureDay: SpecialClosureDay): Observable<SpecialClosureDay> {
    // In a real application, this would call an API endpoint
    // return this.http.post<SpecialClosureDay>(`${environment.apiUrl}/business-hours/special-closure-days`, closureDay);

    // For now, just return the input with a generated ID
    return of({
      ...closureDay,
      id: this.generateId()
    });
  }

  deleteSpecialClosureDay(id: string): Observable<void> {
    // In a real application, this would call an API endpoint
    // return this.http.delete<void>(`${environment.apiUrl}/business-hours/special-closure-days/${id}`);

    // For now, just return void
    return of(void 0);
  }

  private getMockBusinessHours(): BusinessHours {
    return {
      weeklySchedule: {
        monday: {
          isOpen: true,
          openTime: '09:00',
          closeTime: '18:00',
          breakStartTime: '13:00',
          breakEndTime: '14:00'
        },
        tuesday: {
          isOpen: true,
          openTime: '09:00',
          closeTime: '18:00',
          breakStartTime: '13:00',
          breakEndTime: '14:00'
        },
        wednesday: {
          isOpen: true,
          openTime: '09:00',
          closeTime: '18:00',
          breakStartTime: '13:00',
          breakEndTime: '14:00'
        },
        thursday: {
          isOpen: true,
          openTime: '09:00',
          closeTime: '18:00',
          breakStartTime: '13:00',
          breakEndTime: '14:00'
        },
        friday: {
          isOpen: true,
          openTime: '09:00',
          closeTime: '18:00',
          breakStartTime: '13:00',
          breakEndTime: '14:00'
        },
        saturday: {
          isOpen: true,
          openTime: '10:00',
          closeTime: '16:00'
        },
        sunday: {
          isOpen: false,
          openTime: '10:00',
          closeTime: '16:00'
        }
      },
      specialClosureDays: [
        {
          id: '1',
          date: '2023-12-24',
          name: 'Wigilia'
        },
        {
          id: '2',
          date: '2023-12-25',
          name: 'Boże Narodzenie'
        },
        {
          id: '3',
          date: '2023-12-26',
          name: 'Drugi dzień Świąt'
        },
        {
          id: '4',
          date: '2024-01-01',
          name: 'Nowy Rok'
        }
      ],
      allowBookingsOutsideBusinessHours: false
    };
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
