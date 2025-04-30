import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Appointment, AppointmentService } from '../../@core/services/appointment.service';
import { ExportService } from '../../@core/services/export.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    MultiSelectModule,
    TooltipModule,
    TagModule,
    TranslateModule,
    Select,
  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss',
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];

  // Filters
  dateRange: Date[] = [];
  selectedStatuses: string[] = [];
  selectedClient: string = '';
  selectedService: string = '';

  statusOptions = [
    { label: 'enum.status.confirmed', value: 'confirmed' },
    { label: 'enum.status.canceled', value: 'canceled' },
    { label: 'enum.status.completed', value: 'completed' },
  ];

  clients: string[] = [];
  services: string[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private exportService: ExportService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.loadFiltersData();
    this.translateStatusOptions();
  }

  translateStatusOptions(): void {
    this.statusOptions = this.statusOptions.map((option) => ({
      ...option,
      label: this.translateService.instant(option.label),
    }));
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe((data) => {
      this.appointments = data;
      this.filteredAppointments = [...this.appointments];
    });
  }

  loadFiltersData(): void {
    this.appointmentService.getUniqueClients().subscribe((clients) => {
      this.clients = clients;
    });

    this.appointmentService.getUniqueServices().subscribe((services) => {
      this.services = services;
    });
  }

  applyFilters(): void {
    this.filteredAppointments = this.appointments.filter((appointment) => {
      // Filter by date range
      if (this.dateRange && this.dateRange.length === 2) {
        const appointmentDate = new Date(appointment.date);
        if (appointmentDate < this.dateRange[0] || appointmentDate > this.dateRange[1]) {
          return false;
        }
      }

      // Filter by status
      if (this.selectedStatuses.length > 0 && !this.selectedStatuses.includes(appointment.status)) {
        return false;
      }

      // Filter by client
      if (this.selectedClient && appointment.clientName !== this.selectedClient) {
        return false;
      }

      // Filter by service
      if (this.selectedService && appointment.serviceName !== this.selectedService) {
        return false;
      }

      return true;
    });
  }

  resetFilters(): void {
    this.dateRange = [];
    this.selectedStatuses = [];
    this.selectedClient = '';
    this.selectedService = '';
    this.filteredAppointments = [...this.appointments];
  }

  exportPDF(): void {
    this.exportService.exportToPDF(this.filteredAppointments, 'wizyty');
  }

  exportExcel(): void {
    this.exportService.exportToExcel(this.filteredAppointments, 'wizyty');
  }

  getStatusSeverity(status: string): 'success' | 'danger' | 'info' | 'warn' | 'secondary' {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'canceled':
        return 'danger';
      case 'completed':
        return 'info';
      default:
        return 'secondary';
    }
  }

  getStatusLabel(status: string): string {
    const statusKey = `enum.status.${status}`;
    return this.translateService.instant(statusKey);
  }
}
