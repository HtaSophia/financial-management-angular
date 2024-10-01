import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { TransactionService } from './features/transactions/shared/transaction.service';
import { authGuard } from './core/auth/auth.guard';

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
        canActivate: [authGuard],
        loadComponent: () => import('./core/layout/nav-layout.component').then((mod) => mod.NavLayoutComponent),
        providers: [TransactionService],
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
