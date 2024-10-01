import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public get user(): User | null {
        const currentUser = localStorage.getItem('user');
        if (currentUser) return JSON.parse(currentUser);

        return null;
    }

    public login(email: string): void {
        const username = email.split('@')[0];
        localStorage.setItem('user', JSON.stringify({ username, email }));
    }

    public logout(): void {
        localStorage.removeItem('user');
    }

    public isAuthenticated(): boolean {
        return !!this.user;
    }
}
