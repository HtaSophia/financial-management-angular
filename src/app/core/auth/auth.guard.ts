import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (_route, _state) => {
    if (!inject(AuthService).isAuthenticated) {
        inject(Router).navigate(['login']);
        return false;
    }

    return true;
};
