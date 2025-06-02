import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { Card } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Appointment, AppointmentService } from '../../@core/services/appointment.service';
import { ExportService } from '../../@core/services/export.service';
import { AppointmentType } from '../../@shared/enum/appointment';
import {RouterOutlet} from "@angular/router";
import {
  AppointmentCalendarComponent
} from "../../@shared/components/appointment-calendar/appointment-calendar.component";

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
    AppointmentCalendarComponent
  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentListComponent implements OnInit {
  selectedTab = AppointmentType.UPCOMING;

  protected readonly tabs = [
    {
      type: AppointmentType.UPCOMING,
      icon: 'pi pi-clock'
    },
    {
      type: AppointmentType.PENDING,
      icon: 'pi pi-hourglass'
    },
    {
      type: AppointmentType.PAST,
      icon: 'pi pi-history'
    },
    {
      type: AppointmentType.CANCELLED,
      icon: 'pi pi-times-circle'
    }
  ];

  ngOnInit(): void {

  }
}
