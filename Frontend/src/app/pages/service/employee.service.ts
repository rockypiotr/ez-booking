import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Employee } from '../../@shared/models/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getEmployees(): Observable<Employee[]> {
    // In a real application, this would be an HTTP request to the API
    // return this.http.get<Employee[]>(`${this.apiUrl}/employees`);

    // For now, return mock data
    return of([
      {
        id: '1',
        name: 'Karolina',
        imgUrl: 'https://primefaces.org/cdn/primevue/images/landing/apps/avatar1.png',
        email: 'karolina@example.com',
        phone: '+48 123 456 789',
        role: 'Nail Technician',
        specialization: 'Manicure, Pedicure',
        bio: 'Karolina is a certified nail technician with 5 years of experience.',
        services: [
          {
            id: '1',
            name: 'Manicure',
            description: 'Classic manicure with polish',
            duration: 60,
            price: 100,
          },
          {
            id: '2',
            name: 'Pedicure',
            description: 'Classic pedicure with polish',
            duration: 60,
            price: 120,
          },
        ],
        schedule: [
          {
            id: '1',
            day: 'Monday',
            startTime: '09:00',
            endTime: '17:00',
          },
          {
            id: '2',
            day: 'Wednesday',
            startTime: '09:00',
            endTime: '17:00',
          },
          {
            id: '3',
            day: 'Friday',
            startTime: '09:00',
            endTime: '17:00',
          },
        ],
        reviews: [
          {
            id: '1',
            userId: '1',
            userName: 'Anna',
            rating: 5,
            comment: 'Karolina is amazing! My nails look perfect.',
            date: new Date('2023-01-15'),
          },
        ],
        portfolio: [
          {
            id: '1',
            title: 'French Manicure',
            description: 'Classic French manicure with a twist',
            imageUrl: 'https://example.com/portfolio1.jpg',
            date: new Date('2023-01-10'),
          },
        ],
      },
      {
        id: '2',
        name: 'Ania',
        imgUrl: 'https://primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
        email: 'ania@example.com',
        phone: '+48 987 654 321',
        role: 'Hair Stylist',
        specialization: 'Haircuts, Coloring',
        bio: 'Ania is a professional hair stylist with 7 years of experience.',
        services: [
          {
            id: '3',
            name: 'Haircut',
            description: 'Haircut and styling',
            duration: 60,
            price: 150,
          },
          {
            id: '4',
            name: 'Hair Coloring',
            description: 'Full hair coloring',
            duration: 120,
            price: 250,
          },
        ],
        schedule: [
          {
            id: '4',
            day: 'Tuesday',
            startTime: '09:00',
            endTime: '17:00',
          },
          {
            id: '5',
            day: 'Thursday',
            startTime: '09:00',
            endTime: '17:00',
          },
          {
            id: '6',
            day: 'Saturday',
            startTime: '09:00',
            endTime: '15:00',
          },
        ],
        reviews: [
          {
            id: '2',
            userId: '2',
            userName: 'Magda',
            rating: 5,
            comment: 'Ania is the best hair stylist I\'ve ever had!',
            date: new Date('2023-02-20'),
          },
        ],
        portfolio: [
          {
            id: '2',
            title: 'Balayage',
            description: 'Natural-looking balayage highlights',
            imageUrl: 'https://example.com/portfolio2.jpg',
            date: new Date('2023-02-15'),
          },
        ],
      },
      {
        id: '3',
        name: 'Judyta',
        imgUrl: 'https://primefaces.org/cdn/primevue/images/landing/apps/avatar3.png',
        email: 'judyta@example.com',
        phone: '+48 111 222 333',
        role: 'Makeup Artist',
        specialization: 'Bridal Makeup, Special Occasion Makeup',
        bio: 'Judyta is a talented makeup artist with 4 years of experience.',
        services: [
          {
            id: '5',
            name: 'Bridal Makeup',
            description: 'Complete bridal makeup with trial',
            duration: 120,
            price: 300,
          },
          {
            id: '6',
            name: 'Evening Makeup',
            description: 'Glamorous evening makeup',
            duration: 60,
            price: 150,
          },
        ],
        schedule: [
          {
            id: '7',
            day: 'Monday',
            startTime: '12:00',
            endTime: '20:00',
          },
          {
            id: '8',
            day: 'Wednesday',
            startTime: '12:00',
            endTime: '20:00',
          },
          {
            id: '9',
            day: 'Friday',
            startTime: '12:00',
            endTime: '20:00',
          },
        ],
        reviews: [
          {
            id: '3',
            userId: '3',
            userName: 'Kasia',
            rating: 5,
            comment: 'Judyta did my wedding makeup and it was perfect!',
            date: new Date('2023-03-10'),
          },
        ],
        portfolio: [
          {
            id: '3',
            title: 'Bridal Makeup',
            description: 'Elegant bridal makeup for a summer wedding',
            imageUrl: 'https://example.com/portfolio3.jpg',
            date: new Date('2023-03-05'),
          },
        ],
      },
      {
        id: '4',
        name: 'Agata',
        imgUrl: 'https://primefaces.org/cdn/primevue/images/landing/apps/avatar4.png',
        email: 'agata@example.com',
        phone: '+48 444 555 666',
        role: 'Esthetician',
        specialization: 'Facials, Waxing',
        bio: 'Agata is a certified esthetician with 6 years of experience.',
        services: [
          {
            id: '7',
            name: 'Facial',
            description: 'Deep cleansing facial',
            duration: 60,
            price: 180,
          },
          {
            id: '8',
            name: 'Waxing',
            description: 'Full leg waxing',
            duration: 45,
            price: 120,
          },
        ],
        schedule: [
          {
            id: '10',
            day: 'Tuesday',
            startTime: '10:00',
            endTime: '18:00',
          },
          {
            id: '11',
            day: 'Thursday',
            startTime: '10:00',
            endTime: '18:00',
          },
          {
            id: '12',
            day: 'Saturday',
            startTime: '10:00',
            endTime: '16:00',
          },
        ],
        reviews: [
          {
            id: '4',
            userId: '4',
            userName: 'Monika',
            rating: 5,
            comment: 'Agata\'s facials are amazing! My skin looks so much better.',
            date: new Date('2023-04-05'),
          },
        ],
        portfolio: [
          {
            id: '4',
            title: 'Hydrating Facial',
            description: 'Hydrating facial for dry skin',
            imageUrl: 'https://example.com/portfolio4.jpg',
            date: new Date('2023-04-01'),
          },
        ],
      },
    ]);
  }

  getEmployeeById(id: string): Observable<Employee | undefined> {
    // In a real application, this would be an HTTP request to the API
    // return this.http.get<Employee>(`${this.apiUrl}/employees/${id}`);

    // For now, return mock data
    return this.getEmployees().pipe(
      map(employees => employees.find(employee => employee.id === id))
    );
  }
}
