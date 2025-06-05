import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { localStorageSync } from 'ngrx-store-localstorage';
import { providePrimeNG } from 'primeng/config';
import { authInterceptor } from './@core/http/auth.interceptor';
import { appReducers } from './@core/store/app.state';
import { AuthEffects } from './@core/store/auth/auth.effects';
import { routes } from './app.routes';
import { themePreset } from './theme-preset';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
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
    MessageService,
  ],
};
