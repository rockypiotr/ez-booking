import { Routes } from '@angular/router';
import { Crud } from './crud/crud';
import { Documentation } from './documentation/documentation';
import { Empty } from './empty/empty';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceEditComponent } from './service-list/service-edit/service-edit.component';

export default [
  { path: 'documentation', component: Documentation },
  { path: 'crud', component: Crud },
  { path: 'empty', component: Empty },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'services/new', component: ServiceEditComponent },
  { path: 'services/edit/:id', component: ServiceEditComponent },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
