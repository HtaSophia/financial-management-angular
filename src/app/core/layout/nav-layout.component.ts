import { ChangeDetectionStrategy, Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { logOut } from '../auth/store/auth.actions';
import { selectUser } from '../auth/store/auth.reducer';

@Component({
    selector: 'fm-nav-layout',
    templateUrl: './nav-layout.component.html',
    styleUrl: './nav-layout.component.scss',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLayoutComponent implements OnInit, OnDestroy {
    private readonly store = inject(Store);

    public readonly isMobile = signal(false);
    public readonly user = this.store.selectSignal(selectUser);

    private readonly breakpointObserver = inject(BreakpointObserver);
    private subscription?: Subscription;

    ngOnInit() {
        this.subscription = this.breakpointObserver.observe(Breakpoints.Handset).subscribe(({ matches: isHandset }) => {
            this.isMobile.set(isHandset);
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    public onLogout(): void {
        this.store.dispatch(logOut());
    }
}
