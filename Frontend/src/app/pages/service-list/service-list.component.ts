import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceService } from '../service/service.service';
import { Service } from '../../@shared/models/service';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../../@shared/models/employee';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './service-list.component.html',
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  employees: Employee[] = [];
  loading = true;
  error = false;

  constructor(
    private serviceService: ServiceService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadEmployees();
  }

  loadServices(): void {
    this.loading = true;
    this.error = false;

    this.serviceService.getServices().subscribe({
      next: (services) => {
        this.services = services;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading services', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (err) => {
        console.error('Error loading employees', err);
      }
    });
  }

  deleteService(id: string): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.serviceService.deleteService(id).subscribe({
        next: () => {
          this.services = this.services.filter(service => service.id !== id);
        },
        error: (err) => {
          console.error('Error deleting service', err);
        }
      });
    }
  }

  getEmployeeNameById(id: string): string {
    const employee = this.employees.find(emp => emp.id === id);
    return employee ? employee.name : 'Unknown';
  }
}
