import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fm-dashboard',
    standalone: true,
    imports: [],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
