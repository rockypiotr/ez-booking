import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceEditComponent } from './service-list/service-edit/service-edit.component';
import { BusinessHoursComponent } from './business-hours/business-hours.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

export default [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'services/new', component: ServiceEditComponent },
  { path: 'services/edit/:id', component: ServiceEditComponent },
  { path: 'business-hours', component: BusinessHoursComponent },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
