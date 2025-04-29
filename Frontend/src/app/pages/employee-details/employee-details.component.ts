import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Employee } from '../../@shared/models/employee';
import { EmployeeService } from '../service/employee.service';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    // PrimeNG modules
    ButtonModule,
    CardModule,
    DividerModule,
    ProgressSpinnerModule,
    TableModule,
    TabViewModule,
    AvatarModule,
    MessageModule,
    RatingModule,
    ImageModule,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | undefined;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadEmployee(id);
      } else {
        this.router.navigate(['/pages/employees']);
      }
    });
  }

  loadEmployee(id: string): void {
    this.loading = true;
    this.error = false;

    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employee = employee;
        this.loading = false;

        if (!employee) {
          this.error = true;
        }
      },
      error: (err) => {
        console.error('Error loading employee', err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  getAverageRating(): string {
    if (!this.employee || this.employee.reviews.length === 0) {
      return 'N/A';
    }

    const sum = this.employee.reviews.reduce((total, review) => total + review.rating, 0);
    const average = sum / this.employee.reviews.length;
    return average.toFixed(1);
  }
}
