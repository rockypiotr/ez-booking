import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-base-modal',
  imports: [],
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.scss',
})
export abstract class BaseModalComponent implements OnInit {
  form!: FormGroup;

  protected readonly ref = inject(DynamicDialogRef);
  protected readonly fb = inject(FormBuilder);

  get canCloseModal(): boolean {
    return !this.form.dirty;
  }

  ngOnInit(): void {
    this.createForm();
  }

  abstract createForm(): void;

  abstract validateForm(): void;

  onCloseModal() {
    // if (this.canCloseModal) {
    //   this.ref.close();
    // }
    this.ref.close();
  }
}
