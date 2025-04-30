import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Appointment {
  id: number;
  date: Date;
  status: 'confirmed' | 'canceled' | 'completed';
  clientName: string;
  serviceName: string;
  employeeName: string;
  price: number;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments: Appointment[] = [
    {
      id: 1,
      date: new Date('2023-06-15T10:00:00'),
      status: 'confirmed',
      clientName: 'Anna Kowalska',
      serviceName: 'Manicure hybrydowy',
      employeeName: 'Marta Nowak',
      price: 120,
      duration: 60
    },
    {
      id: 2,
      date: new Date('2023-06-16T14:30:00'),
      status: 'canceled',
      clientName: 'Jan Nowak',
      serviceName: 'Pedicure',
      employeeName: 'Katarzyna Wiśniewska',
      price: 150,
      duration: 90
    },
    {
      id: 3,
      date: new Date('2023-06-10T12:00:00'),
      status: 'completed',
      clientName: 'Maria Wiśniewska',
      serviceName: 'Przedłużanie paznokci',
      employeeName: 'Marta Nowak',
      price: 200,
      duration: 120
    },
    {
      id: 4,
      date: new Date('2023-06-20T11:15:00'),
      status: 'confirmed',
      clientName: 'Tomasz Kowalczyk',
      serviceName: 'Pedicure spa',
      employeeName: 'Katarzyna Wiśniewska',
      price: 180,
      duration: 90
    },
    {
      id: 5,
      date: new Date('2023-06-21T13:00:00'),
      status: 'confirmed',
      clientName: 'Aleksandra Nowakowska',
      serviceName: 'Manicure klasyczny',
      employeeName: 'Marta Nowak',
      price: 80,
      duration: 45
    },
    {
      id: 6,
      date: new Date('2023-06-05T15:30:00'),
      status: 'completed',
      clientName: 'Barbara Zielińska',
      serviceName: 'Usunięcie hybryd',
      employeeName: 'Katarzyna Wiśniewska',
      price: 60,
      duration: 30
    }
  ];

  constructor() { }

  getAppointments(): Observable<Appointment[]> {
    return of(this.appointments);
  }

  getAppointmentById(id: number): Observable<Appointment | undefined> {
    const appointment = this.appointments.find(app => app.id === id);
    return of(appointment);
  }

  getUniqueClients(): Observable<string[]> {
    const clients = [...new Set(this.appointments.map(app => app.clientName))];
    return of(clients);
  }

  getUniqueServices(): Observable<string[]> {
    const services = [...new Set(this.appointments.map(app => app.serviceName))];
    return of(services);
  }

  getAppointmentsByStatus(status: string): Observable<Appointment[]> {
    const filteredAppointments = this.appointments.filter(app => app.status === status);
    return of(filteredAppointments);
  }

  getAppointmentsByDateRange(startDate: Date, endDate: Date): Observable<Appointment[]> {
    const filteredAppointments = this.appointments.filter(app => {
      const appDate = new Date(app.date);
      return appDate >= startDate && appDate <= endDate;
    });
    return of(filteredAppointments);
  }
} 