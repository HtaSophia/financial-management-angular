import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authFeature } from './core/auth/store/auth.reducer';
import * as authEffects from './core/auth/store/auth.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideStore(),
        provideState(authFeature),
        provideEffects(authEffects),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), autoPause: true }),
    ],
};
