import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../../@core/services/client.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-client-add-modal',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './client-add-modal.component.html',
  styleUrl: './client-add-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientAddModalComponent implements OnInit {
  private readonly clientService: ClientService = inject(ClientService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  form!: FormGroup;

  businessId: string = '91acb806-34dd-486c-a7bd-855bf688a374'; // This should be dynamically set based on the business context

  ngOnInit(): void {
    this.createForm();
  }

  onSave() {
    if (this.form.valid) {
      this.clientService
        .addClient(this.form.getRawValue(), this.businessId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((newClient) => {
          // Handle the response after adding the client
          console.log('Client added successfully:', newClient);
          // Optionally, you can close the modal or reset the form here
          this.dialogRef.close(newClient);
          this.form.reset();
        }, (error) => {
          // Handle error response
          console.error('Error adding client:', error);
          // Optionally, you can show an error message to the user
        });
    }
  }

  private createForm() {
    this.form = this.clientService.createSimpleAddClientForm();
  }
}
