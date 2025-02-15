import { Component, inject } from '@angular/core';
import { Footer } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppointmentModalComponent } from './appointment-modal/appointment-modal.component';

@Component({
  selector: 'app-appointment',
  imports: [ButtonDirective],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
  providers: [DialogService],
})
export class AppointmentComponent {
  ref: DynamicDialogRef<AppointmentModalComponent> | undefined;

  private readonly dialogService = inject(DialogService);

  openModal() {
    this.ref = this.dialogService.open(AppointmentModalComponent, {
      header: 'Dodaj wizytę',
      modal: true,
      width: '48rem',
      closable: true,
      templates: {
        footer: Footer,
      },
    });
  }
}
