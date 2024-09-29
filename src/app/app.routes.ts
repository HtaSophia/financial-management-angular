import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
    },
    {
        path: '',
        loadComponent: () => import('./core/layout/nav-layout.component').then((mod) => mod.NavLayoutComponent),
        children: [
            {
                path: 'dashboard',
                title: 'Dashboard',
                loadComponent: () =>
                    import('./features/dashboard/dashboard.component').then((mod) => mod.DashboardComponent),
            },
            {
                path: 'transactions',
                loadChildren: () => import('./features/transactions/transactions.routes'),
            },
        ],
    },
];
