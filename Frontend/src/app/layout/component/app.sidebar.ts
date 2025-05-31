import { Component, ElementRef } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { AppMenu } from './app.menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AppMenu, Button, Avatar],
  template: ` <div class="layout-sidebar shadow-lg">
    <div class="pt-3 pb-8">
      <i class=""></i>
      <span
        class="text-5xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 font-extrabold bg-clip-text text-transparent"
        >EZ-Booking</span
      >
    </div>
    <app-menu></app-menu>
    <div class="mt-auto rounded-lg p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div class="flex flex-col items-center gap-5">
        <span class="text-white text-center text-lg font-bold"
          >Upgrade to PRO to get access all Features!</span
        >
        <p-button severity="secondary" label="Get pro now!" raised rounded></p-button>
      </div>
    </div>
    <div class="flex items-center pb-3 py-9 gap-2">
      <div>
        <p-avatar
          image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png"
          size="large"
          shape="circle"
        ></p-avatar>
      </div>
      <div class="flex flex-col">
        <strong class="text-xl">Łukasz H</strong>
        <span>Administrator</span>
      </div>
      <p-button
        type="button"
        icon="pi pi-sign-out"
        ariaLabel="sign out"
        text
        class="layout-topbar-action ml-auto"
        rounded
      />
    </div>
  </div>`,
})
export class AppSidebar {
  constructor(public el: ElementRef) {}
}
