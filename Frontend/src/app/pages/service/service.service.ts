import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Service } from '../../@shared/models/service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getServices(): Observable<Service[]> {
    // In a real application, this would be an HTTP request to the API
    // return this.http.get<Service[]>(`${this.apiUrl}/services`);

    // For now, return mock data
    return of([
      {
        id: '1',
        name: 'Manicure',
        description: 'Classic manicure with polish',
        category: 'Nail Care',
        employeeServices: [
          {
            employeeId: '1',
            employeeName: 'Karolina',
            duration: 60,
            price: 100,
          },
          {
            employeeId: '4',
            employeeName: 'Agata',
            duration: 45,
            price: 90,
          },
        ],
      },
      {
        id: '2',
        name: 'Pedicure',
        description: 'Classic pedicure with polish',
        category: 'Nail Care',
        employeeServices: [
          {
            employeeId: '1',
            employeeName: 'Karolina',
            duration: 60,
            price: 120,
          },
          {
            employeeId: '4',
            employeeName: 'Agata',
            duration: 50,
            price: 110,
          },
        ],
      },
      {
        id: '3',
        name: 'Haircut',
        description: 'Haircut and styling',
        category: 'Hair Care',
        employeeServices: [
          {
            employeeId: '2',
            employeeName: 'Ania',
            duration: 60,
            price: 150,
          },
        ],
      },
      {
        id: '4',
        name: 'Hair Coloring',
        description: 'Full hair coloring',
        category: 'Hair Care',
        employeeServices: [
          {
            employeeId: '2',
            employeeName: 'Ania',
            duration: 120,
            price: 250,
          },
        ],
      },
      {
        id: '5',
        name: 'Bridal Makeup',
        description: 'Complete bridal makeup with trial',
        category: 'Makeup',
        employeeServices: [
          {
            employeeId: '3',
            employeeName: 'Judyta',
            duration: 120,
            price: 300,
          },
        ],
      },
      {
        id: '6',
        name: 'Evening Makeup',
        description: 'Glamorous evening makeup',
        category: 'Makeup',
        employeeServices: [
          {
            employeeId: '3',
            employeeName: 'Judyta',
            duration: 60,
            price: 150,
          },
        ],
      },
      {
        id: '7',
        name: 'Facial',
        description: 'Deep cleansing facial',
        category: 'Skin Care',
        employeeServices: [
          {
            employeeId: '4',
            employeeName: 'Agata',
            duration: 60,
            price: 180,
          },
        ],
      },
      {
        id: '8',
        name: 'Waxing',
        description: 'Full leg waxing',
        category: 'Skin Care',
        employeeServices: [
          {
            employeeId: '4',
            employeeName: 'Agata',
            duration: 45,
            price: 120,
          },
        ],
      },
    ]);
  }

  getServiceById(id: string): Observable<Service | undefined> {
    // In a real application, this would be an HTTP request to the API
    // return this.http.get<Service>(`${this.apiUrl}/services/${id}`);

    // For now, return mock data
    return of(this.getMockServices().find(service => service.id === id));
  }

  createService(service: Service): Observable<Service> {
    // In a real application, this would be an HTTP request to the API
    // return this.http.post<Service>(`${this.apiUrl}/services`, service);

    // For now, return the service with a new ID
    const newService = { ...service, id: this.generateId() };
    return of(newService);
  }

  updateService(service: Service): Observable<Service> {
    // In a real application, this would be an HTTP request to the API
    // return this.http.put<Service>(`${this.apiUrl}/services/${service.id}`, service);

    // For now, return the updated service
    return of(service);
  }

  deleteService(id: string): Observable<void> {
    // In a real application, this would be an HTTP request to the API
    // return this.http.delete<void>(`${this.apiUrl}/services/${id}`);

    // For now, return void
    return of(undefined);
  }

  private getMockServices(): Service[] {
    return [
      {
        id: '1',
        name: 'Manicure',
        description: 'Classic manicure with polish',
        category: 'Nail Care',
        employeeServices: [
          {
            employeeId: '1',
            employeeName: 'Karolina',
            duration: 60,
            price: 100,
          },
          {
            employeeId: '4',
            employeeName: 'Agata',
            duration: 45,
            price: 90,
          },
        ],
      },
      {
        id: '2',
        name: 'Pedicure',
        description: 'Classic pedicure with polish',
        category: 'Nail Care',
        employeeServices: [
          {
            employeeId: '1',
            employeeName: 'Karolina',
            duration: 60,
            price: 120,
          },
          {
            employeeId: '4',
            employeeName: 'Agata',
            duration: 50,
            price: 110,
          },
        ],
      },
      {
        id: '3',
        name: 'Haircut',
        description: 'Haircut and styling',
        category: 'Hair Care',
        employeeServices: [
          {
            employeeId: '2',
            employeeName: 'Ania',
            duration: 60,
            price: 150,
          },
        ],
      },
      {
        id: '4',
        name: 'Hair Coloring',
        description: 'Full hair coloring',
        category: 'Hair Care',
        employeeServices: [
          {
            employeeId: '2',
            employeeName: 'Ania',
            duration: 120,
            price: 250,
          },
        ],
      },
      {
        id: '5',
        name: 'Bridal Makeup',
        description: 'Complete bridal makeup with trial',
        category: 'Makeup',
        employeeServices: [
          {
            employeeId: '3',
            employeeName: 'Judyta',
            duration: 120,
            price: 300,
          },
        ],
      },
      {
        id: '6',
        name: 'Evening Makeup',
        description: 'Glamorous evening makeup',
        category: 'Makeup',
        employeeServices: [
          {
            employeeId: '3',
            employeeName: 'Judyta',
            duration: 60,
            price: 150,
          },
        ],
      },
      {
        id: '7',
        name: 'Facial',
        description: 'Deep cleansing facial',
        category: 'Skin Care',
        employeeServices: [
          {
            employeeId: '4',
            employeeName: 'Agata',
            duration: 60,
            price: 180,
          },
        ],
      },
      {
        id: '8',
        name: 'Waxing',
        description: 'Full leg waxing',
        category: 'Skin Care',
        employeeServices: [
          {
            employeeId: '4',
            employeeName: 'Agata',
            duration: 45,
            price: 120,
          },
        ],
      },
    ];
  }

  private generateId(): string {
    // Simple ID generation for mock data
    return Math.random().toString(36).substring(2, 9);
  }
}
