import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy, WritableSignal, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable, Subscription } from 'rxjs';
import Chart from 'chart.js/auto';

import { DashboardService } from './dashboard.service';
import { MonthlyOverview, TotalOverview, TransactionsOverview } from './models/dashboard.model';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'fm-dashboard',
    standalone: true,
    imports: [MatCardModule, CurrencyPipe],
    providers: [DashboardService],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
    public chart?: Chart;
    public totalOverview: WritableSignal<TotalOverview> = signal({ income: 0, outcome: 0, total: 0 });

    private readonly dashboardService = inject(DashboardService);
    private subscription?: Subscription;

    ngOnInit() {
        this.subscription = this.getMonthlyOverview().subscribe((overview) => {
            console.log(overview);
            this.chart = this.generateBarChart(overview.monthly);
            this.totalOverview.set(overview.total);
        });
    }

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }

    private getMonthlyOverview(): Observable<TransactionsOverview> {
        return this.dashboardService.getTransactionsOverview();
    }

    private generateBarChart({ dates, incomes, outcomes }: MonthlyOverview): Chart {
        return new Chart('canvas', {
            type: 'bar',
            data: {
                labels: [...dates],
                datasets: [
                    {
                        label: 'Income',
                        data: [...incomes],
                        borderWidth: 1,
                        borderColor: 'rgb(54, 235, 114)',
                        backgroundColor: 'rgba(54, 235, 114, 0.2)',
                    },
                    {
                        label: 'Outcome',
                        data: [...outcomes],
                        borderWidth: 1,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Transactions of Current Month',
                    },
                },
            },
        });
    }
}
