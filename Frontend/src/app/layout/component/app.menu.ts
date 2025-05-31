import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `
    <ul class="layout-menu">
      @for (item of model; track item.label; let i = $index) {
        <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppMenu {
  model: MenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [{ label: 'menu.dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }],
      },
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/pages'],
        items: [
          {
            label: 'menu.appointments',
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/pages/appointments'],
          },
          {
            label: 'menu.employees',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/pages/employees'],
          },
          {
            label: 'menu.customers',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/pages/customers'],
          },
          {
            label: 'menu.services',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/pages/services'],
          },
          {
            label: 'menu.businessHours',
            icon: 'pi pi-fw pi-clock',
            routerLink: ['/pages/business-hours'],
          },
        ],
      },
    ];
  }
}
