import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { providePrimeNG } from 'primeng/config';
import { appReducers } from './@core/store/app.state';
import { AuthEffects } from './@core/store/auth/auth.effects';
import { routes } from './app.routes';
import { themePreset } from './theme-preset';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: themePreset,
        options: { darkModeSelector: '.app-dark' },
      },
    }),
    provideStore(appReducers, { metaReducers }),
    provideEffects([AuthEffects]),
  ],
};
