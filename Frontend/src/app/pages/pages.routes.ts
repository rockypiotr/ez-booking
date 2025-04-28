import { Routes } from '@angular/router';
import { Crud } from './crud/crud';
import { Documentation } from './documentation/documentation';
import { Empty } from './empty/empty';
import { EmployeeListComponent } from './employee-list/employee-list.component';

export default [
  { path: 'documentation', component: Documentation },
  { path: 'crud', component: Crud },
  { path: 'empty', component: Empty },
  { path: 'employees', component: EmployeeListComponent },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
