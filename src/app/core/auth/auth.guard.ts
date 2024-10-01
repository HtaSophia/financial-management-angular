import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (_route, _state) => {
    const authService = inject(AuthService);

    if (authService.isAuthenticated()) {
        return true;
    } else {
        inject(Router).navigate(['login']);
        return false;
    }
};
