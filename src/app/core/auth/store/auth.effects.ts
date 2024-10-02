import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

export const logIn$ = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
        return actions$.pipe(
            ofType(AuthActions.logIn),
            mergeMap(({ email }) =>
                authService.login(email).pipe(
                    map((user) => AuthActions.logInSuccess({ user })),
                    catchError((error: { message: string }) => {
                        console.log(`error`);
                        return of(AuthActions.logInError({ error: error.message }));
                    })
                )
            )
        );
    },
    { functional: true }
);

export const logInSuccess$ = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(AuthActions.logInSuccess),
            tap(() => of(router.navigate(['dashboard'])))
        );
    },
    { dispatch: false, functional: true }
);

export const logInError$ = createEffect(
    (actions$ = inject(Actions), alertService = inject(MatSnackBar)) => {
        return actions$.pipe(
            ofType(AuthActions.logInError),
            tap(({ error }) => alertService.open(`Login failed: ${error}`, 'close', { duration: 3000 }))
        );
    },
    { dispatch: false, functional: true }
);

export const logOut$ = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
        return actions$.pipe(
            ofType(AuthActions.logOut),
            mergeMap(() =>
                of(authService.logout()).pipe(
                    map(() => AuthActions.logOutSuccess()),
                    catchError((error: { message: string }) => of(AuthActions.logOutError({ error: error.message })))
                )
            )
        );
    },
    { functional: true }
);

export const logOutSuccess$ = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(AuthActions.logOutSuccess),
            tap(() => of(router.navigate(['/login'])))
        );
    },
    { dispatch: false, functional: true }
);
