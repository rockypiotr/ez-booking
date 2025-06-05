import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly messageService = inject(MessageService);
  private readonly translateService = inject(TranslateService);

  constructor() {}

  showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: this.translateService.instant('message.severity.success'),
      detail: this.translateService.instant(message),
    });
  }
  showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: this.translateService.instant('message.severity.error'),
      detail: this.translateService.instant(message),
    });
  }
  showInfo(message: string): void {
    this.messageService.add({
      severity: 'info',
      summary: this.translateService.instant('message.severity.info'),
      detail: this.translateService.instant(message),
    });
  }
  showWarn(message: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: this.translateService.instant('message.severity.warn'),
      detail: this.translateService.instant(message),
    });
  }
  clear(): void {
    this.messageService.clear();
  }
}
