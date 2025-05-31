import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SuccessMeter } from '../../@shared/models/success-meter';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuccessMeterService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getMeters(): Observable<SuccessMeter[]> {
    return of([
      {
        icon: 'pi-users',
        label: 'Klientów ogółem',
        value: 5000,
        delta: 2,
      },
      {
        icon: 'pi-comments',
        label: 'Wystawionych opinii',
        value: 5000,
        delta: 2,
      },
      {
        icon: 'pi-calendar-clock',
        label: 'Umówionych wizyt',
        value: 5000,
        delta: 2,
      },
    ]);
    // return this.http.get<any>(`${this.apiUrl}/meter/meters`);
  }
}
