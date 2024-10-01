import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy, WritableSignal, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, Subscription } from 'rxjs';
import Chart from 'chart.js/auto';

import { DashboardService } from './dashboard.service';
import { MonthlyOverview, TotalOverview, TransactionsOverview } from './dashboard.types';

@Component({
    selector: 'fm-dashboard',
    standalone: true,
    imports: [MatButtonModule, MatCardModule, MatProgressSpinnerModule, CurrencyPipe],
    providers: [DashboardService],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
    public chart?: Chart;
    public isLoading: WritableSignal<boolean> = signal(true);
    public totalOverview: WritableSignal<TotalOverview> = signal({ income: 0, outcome: 0, total: 0 });

    private readonly dashboardService = inject(DashboardService);
    private subscription?: Subscription;

    ngOnInit() {
        this.subscription = this.getMonthlyOverview().subscribe({
            next: (overview) => {
                this.chart = this.generateBarChart(overview.monthly);
                this.totalOverview.set(overview.total);
            },
            complete: () => {
                this.isLoading.set(false);
            },
        });
    }

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }

    public onDownloadCsv(): void {
        this.dashboardService.downloadTransactionsCsv();
    }

    public onDownloadPdf(): void {
        this.dashboardService.downloadTransactionsPdf();
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
