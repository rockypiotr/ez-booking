import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../../@shared/models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = true;
  error = false;

  constructor(private employeeService: EmployeeService) {}

  getAverageRating(employee: Employee): string {
    if (employee.reviews.length === 0) {
      return 'N/A';
    }

    const sum = employee.reviews.reduce((total, review) => total + review.rating, 0);
    const average = sum / employee.reviews.length;
    return average.toFixed(1);
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.error = false;

    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading employees', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}
