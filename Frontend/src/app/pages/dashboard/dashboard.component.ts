import { Component } from '@angular/core';
import { SuccessMeterComponent } from './components/success-meter/success-meter.component';

@Component({
  selector: 'app-dashboard',
  imports: [SuccessMeterComponent],
  providers: [],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
