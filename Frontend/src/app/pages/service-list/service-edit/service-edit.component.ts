import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceService } from '../../service/service.service';
import { EmployeeService } from '../../service/employee.service';
import { Service, EmployeeServicePrice } from '../../../@shared/models/service';
import { Employee } from '../../../@shared/models/employee';

@Component({
  selector: 'app-service-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './service-edit.component.html',
})
export class ServiceEditComponent implements OnInit {
  serviceForm!: FormGroup;
  employees: Employee[] = [];
  serviceId: string | null = null;
  isNewService = true;
  loading = false;
  saving = false;
  error = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEmployees();

    this.route.paramMap.subscribe(params => {
      this.serviceId = params.get('id');
      if (this.serviceId && this.serviceId !== 'new') {
        this.isNewService = false;
        this.loadService(this.serviceId);
      }
    });
  }

  initForm(): void {
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: [''],
      employeeServices: this.fb.array([])
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;

        // If it's a new service, add a form group for each employee
        if (this.isNewService) {
          this.employees.forEach(employee => {
            this.addEmployeeService(employee.id, employee.name);
          });
        }
      },
      error: (err) => {
        console.error('Error loading employees', err);
        this.error = true;
      }
    });
  }

  loadService(id: string): void {
    this.loading = true;
    this.error = false;

    this.serviceService.getServiceById(id).subscribe({
      next: (service) => {
        if (service) {
          this.serviceForm.patchValue({
            name: service.name,
            description: service.description,
            category: service.category
          });

          // Clear the employee services array
          while (this.employeeServicesArray.length) {
            this.employeeServicesArray.removeAt(0);
          }

          // Add employee services from the service
          service.employeeServices.forEach(es => {
            this.addEmployeeService(es.employeeId, es.employeeName, es.duration, es.price);
          });

          // Add any missing employees
          this.employees.forEach(employee => {
            const exists = service.employeeServices.some(es => es.employeeId === employee.id);
            if (!exists) {
              this.addEmployeeService(employee.id, employee.name);
            }
          });
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading service', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  get employeeServicesArray(): FormArray {
    return this.serviceForm.get('employeeServices') as FormArray;
  }

  addEmployeeService(employeeId: string, employeeName: string, duration: number = 0, price: number = 0): void {
    this.employeeServicesArray.push(
      this.fb.group({
        employeeId: [employeeId],
        employeeName: [employeeName],
        duration: [duration, [Validators.min(0)]],
        price: [price, [Validators.min(0)]],
        enabled: [duration > 0 || price > 0]
      })
    );
  }

  onSubmit(): void {
    if (this.serviceForm.invalid) {
      return;
    }

    this.saving = true;
    const formValue = this.serviceForm.value;

    // Filter out disabled employee services
    const enabledEmployeeServices = formValue.employeeServices
      .filter((es: any) => es.enabled)
      .map((es: any) => ({
        employeeId: es.employeeId,
        employeeName: es.employeeName,
        duration: es.duration,
        price: es.price
      }));

    const service: Service = {
      id: this.serviceId || '',
      name: formValue.name,
      description: formValue.description,
      category: formValue.category,
      employeeServices: enabledEmployeeServices
    };

    if (this.isNewService) {
      this.serviceService.createService(service).subscribe({
        next: (createdService) => {
          this.saving = false;
          this.router.navigate(['/pages/services']);
        },
        error: (err) => {
          console.error('Error creating service', err);
          this.saving = false;
        }
      });
    } else {
      this.serviceService.updateService(service).subscribe({
        next: (updatedService) => {
          this.saving = false;
          this.router.navigate(['/pages/services']);
        },
        error: (err) => {
          console.error('Error updating service', err);
          this.saving = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/pages/services']);
  }
}
