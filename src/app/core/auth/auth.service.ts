import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public get user(): User | null {
        const currentUser = localStorage.getItem('user');
        if (currentUser) return JSON.parse(currentUser);

        return null;
    }

    public login(email: string): Observable<User> {
        const loggedUser = { username: email.split('@')[0], email };
        localStorage.setItem('user', JSON.stringify(loggedUser));
        return of(loggedUser);
    }

    public logout(): void {
        localStorage.removeItem('user');
    }

    public isAuthenticated(): boolean {
        return !!this.user;
    }
}
