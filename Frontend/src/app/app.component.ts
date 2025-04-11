import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterModule, TranslateModule],
  standalone: true,
  template: ` <router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private readonly translate: TranslateService) {
    this.translate.setDefaultLang('pl');
    this.translate.use('pl');
  }
}
