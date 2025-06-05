import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
import { ToastService } from './@core/services/common/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, TranslateModule, ToastModule],
  providers: [],
  standalone: true,
  template: ` <p-toast position="top-right"></p-toast><router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private readonly translate: TranslateService) {
    this.translate.setDefaultLang('pl');
    this.translate.use('pl');
  }
}
