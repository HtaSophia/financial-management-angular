import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public get user() {
        return localStorage.getItem('user');
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
