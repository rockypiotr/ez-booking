import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BusinessHoursService } from '../service/business-hours.service';
import { BusinessHours, DaySchedule, SpecialClosureDay, WeeklySchedule } from '../../@shared/models/business-hours';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { format } from 'date-fns';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
  selector: 'app-business-hours',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CalendarModule,
    InputTextModule,
    InputSwitchModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    CardModule,
    DividerModule,
    ToggleSwitch,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './business-hours.component.html'
})
export class BusinessHoursComponent implements OnInit {
  // State properties
  businessHours: BusinessHours | null = null;
  loading = true;
  error = false;
  saving = false;

  // Form
  weeklyScheduleForm!: FormGroup;

  // Special closure days dialog
  showSpecialClosureDayDialog = false;
  specialClosureDayDate: Date | null = null;
  specialClosureDayName = '';

  // Column definitions for special closure days table
  specialClosureDaysColumns = [
    { field: 'date', header: 'business-hours.date' },
    { field: 'name', header: 'business-hours.name' }
  ];

  // Constants
  dayOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];

  // Services
  private readonly businessHoursService = inject(BusinessHoursService);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly translateService = inject(TranslateService);

  constructor() {
    // Empty constructor
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadBusinessHours();
  }

  /**
   * Initializes the form with default values
   */
  private initializeForm(): void {
    this.weeklyScheduleForm = this.fb.group({});

    // Initialize form controls for each day of the week
    this.dayOfWeek.forEach(day => {
      this.weeklyScheduleForm.addControl(day, this.fb.group({
        isOpen: [false],
        openTime: ['09:00', Validators.required],
        closeTime: ['18:00', Validators.required],
        hasBreak: [false],
        breakStartTime: ['13:00'],
        breakEndTime: ['14:00']
      }));
    });

    // Add control for allowing bookings outside business hours
    this.weeklyScheduleForm.addControl('allowBookingsOutsideBusinessHours', this.fb.control(false));
  }

  /**
   * Loads business hours data from the service
   */
  loadBusinessHours(): void {
    this.loading = true;
    this.error = false;

    this.businessHoursService.getBusinessHours().subscribe({
      next: (businessHours) => {
        this.businessHours = businessHours;
        this.updateFormFromBusinessHours(businessHours);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading business hours', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  /**
   * Updates form values with the data from the business hours
   */
  updateFormFromBusinessHours(businessHours: BusinessHours): void {
    // Update weekly schedule form
    Object.entries(businessHours.weeklySchedule).forEach(([day, schedule]) => {
      const dayForm = this.weeklyScheduleForm.get(day);
      if (dayForm) {
        dayForm.patchValue({
          isOpen: schedule.isOpen,
          openTime: schedule.openTime,
          closeTime: schedule.closeTime,
          hasBreak: !!(schedule.breakStartTime && schedule.breakEndTime),
          breakStartTime: schedule.breakStartTime || '13:00',
          breakEndTime: schedule.breakEndTime || '14:00'
        });
      }
    });

    // Update allow bookings outside business hours
    this.weeklyScheduleForm.get('allowBookingsOutsideBusinessHours')?.setValue(
      businessHours.allowBookingsOutsideBusinessHours
    );
  }

  /**
   * Saves business hours to the backend
   */
  saveBusinessHours(): void {
    if (this.weeklyScheduleForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'business-hours.validationError'
      });
      return;
    }

    this.saving = true;
    const updatedBusinessHours = this.prepareBusinessHoursData();

    this.businessHoursService.updateBusinessHours(updatedBusinessHours).subscribe({
      next: (result) => {
        this.businessHours = result;
        this.saving = false;
        this.messageService.add({
          severity: 'success',
          summary: 'business-hours.success',
          detail: 'business-hours.saveSuccess'
        });
      },
      error: (err) => {
        console.error('Error saving business hours', err);
        this.saving = false;
        this.messageService.add({
          severity: 'error',
          summary: 'business-hours.error',
          detail: 'business-hours.saveFailed'
        });
      }
    });
  }

  /**
   * Prepares the business hours data from the form values
   */
  private prepareBusinessHoursData(): BusinessHours {
    const formValue = this.weeklyScheduleForm.value;
    const weeklySchedule: WeeklySchedule = {} as WeeklySchedule;

    // Convert form values to business hours model
    Object.entries(formValue).forEach(([key, value]: [string, any]) => {
      if (key !== 'allowBookingsOutsideBusinessHours' && this.dayOfWeek.includes(key)) {
        const daySchedule: DaySchedule = {
          isOpen: value.isOpen,
          openTime: value.openTime,
          closeTime: value.closeTime
        };

        if (value.hasBreak) {
          daySchedule.breakStartTime = value.breakStartTime;
          daySchedule.breakEndTime = value.breakEndTime;
        }

        weeklySchedule[key as keyof WeeklySchedule] = daySchedule;
      }
    });

    return {
      weeklySchedule,
      specialClosureDays: this.businessHours?.specialClosureDays || [],
      allowBookingsOutsideBusinessHours: formValue.allowBookingsOutsideBusinessHours
    };
  }

  /**
   * Applies settings from one day to all other days
   */
  applyToAllDays(sourceDay: string): void {
    const sourceFormGroup = this.weeklyScheduleForm.get(sourceDay);
    if (!sourceFormGroup) return;

    const sourceValue = sourceFormGroup.value;

    this.confirmationService.confirm({
      header: this.translateService.instant('business-hours.confirmApplyAll'),
      message: this.translateService.instant('business-hours.confirmApplyAllMessage'),
      acceptLabel: this.translateService.instant('button.apply'),
      rejectLabel: this.translateService.instant('button.cancel'),
      accept: () => {
        this.dayOfWeek.forEach(day => {
          if (day !== sourceDay) {
            const dayForm = this.weeklyScheduleForm.get(day);
            if (dayForm) {
              dayForm.patchValue({
                isOpen: sourceValue.isOpen,
                openTime: sourceValue.openTime,
                closeTime: sourceValue.closeTime,
                hasBreak: sourceValue.hasBreak,
                breakStartTime: sourceValue.breakStartTime,
                breakEndTime: sourceValue.breakEndTime
              });
            }
          }
        });

        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('message.severity.success'),
          detail: 'business-hours.settingsApplied'
        });
      }
    });
  }

  /**
   * Opens the dialog to add a special closure day
   */
  openSpecialClosureDayDialog(): void {
    this.specialClosureDayDate = null;
    this.specialClosureDayName = '';
    this.showSpecialClosureDayDialog = true;
  }

  /**
   * Adds a new special closure day
   */
  addSpecialClosureDay(): void {
    if (!this.specialClosureDayDate || !this.specialClosureDayName.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'business-hours.error',
        detail: 'business-hours.missingDateOrName'
      });
      return;
    }

    const date = this.formatDate(this.specialClosureDayDate);

    // Check if date already exists
    if (this.businessHours?.specialClosureDays.some(day => day.date === date)) {
      this.messageService.add({
        severity: 'error',
        summary: 'business-hours.error',
        detail: 'business-hours.dateAlreadyExists'
      });
      return;
    }

    const newClosureDay: SpecialClosureDay = {
      id: '', // Will be generated by the service
      date,
      name: this.specialClosureDayName.trim()
    };

    this.businessHoursService.addSpecialClosureDay(newClosureDay).subscribe({
      next: (result) => {
        if (this.businessHours) {
          this.businessHours = {
            ...this.businessHours,
            specialClosureDays: [...this.businessHours.specialClosureDays, result]
          };
        }

        this.showSpecialClosureDayDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'business-hours.success',
          detail: 'business-hours.closureDayAdded'
        });
      },
      error: (err) => {
        console.error('Error adding special closure day', err);
        this.messageService.add({
          severity: 'error',
          summary: 'business-hours.error',
          detail: 'business-hours.closureDayAddFailed'
        });
      }
    });
  }

  /**
   * Deletes a special closure day
   */
  deleteSpecialClosureDay(id: string): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('business-hours.confirmDelete'),
      message: this.translateService.instant('business-hours.confirmDeleteMessage'),
      acceptLabel: this.translateService.instant('button.delete'),
      rejectLabel: this.translateService.instant('button.cancel'),
      accept: () => {
        this.businessHoursService.deleteSpecialClosureDay(id).subscribe({
          next: () => {
            if (this.businessHours) {
              this.businessHours = {
                ...this.businessHours,
                specialClosureDays: this.businessHours.specialClosureDays.filter(day => day.id !== id)
              };
            }

            this.messageService.add({
              severity: 'success',
              summary: 'business-hours.success',
              detail: 'business-hours.closureDayDeleted'
            });
          },
          error: (err) => {
            console.error('Error deleting special closure day', err);
            this.messageService.add({
              severity: 'error',
              summary: 'business-hours.error',
              detail: 'business-hours.closureDayDeleteFailed'
            });
          }
        });
      }
    });
  }

  /**
   * Formats a date object to a string
   */
  private formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd');
  }

  /**
   * Checks if a specific break time is invalid
   */
  isBreakTimeInvalid(day: string): boolean {
    const form = this.weeklyScheduleForm.get(day);
    if (!form) return false;

    const hasBreak = form.get('hasBreak')?.value;
    if (!hasBreak) return false;

    const openTime = form.get('openTime')?.value;
    const closeTime = form.get('closeTime')?.value;
    const breakStartTime = form.get('breakStartTime')?.value;
    const breakEndTime = form.get('breakEndTime')?.value;

    return !openTime || !closeTime || !breakStartTime || !breakEndTime ||
           breakStartTime <= openTime || breakEndTime >= closeTime ||
           breakStartTime >= breakEndTime;
  }
}
