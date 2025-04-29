import { Routes } from '@angular/router';
import { authGuard } from './@core/guards/auth.guard';
import { AppLayout } from './layout/component/app.layout';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Notfound } from './pages/notfound/notfound';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'pages', loadChildren: () => import('./pages/pages.routes') },
    ],
  },
  { path: 'notfound', component: Notfound },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' },
];
