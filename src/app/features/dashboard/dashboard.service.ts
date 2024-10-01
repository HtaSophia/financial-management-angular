import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { MonthlyOverview, TotalOverview, TransactionsOverview } from './dashboard.types';

import { formatDate, isCurrentMonth } from '../../shared/utils/date.util';
import { TRANSACTIONS_DATA } from '../../shared/mocks/transactions.mock';
import { Transaction } from '../../shared/models/transaction.model';
import { FileDownloadService } from '../../shared/services/file-download/file-download.service';

type TotalsByDate = Record<string, { income: number; outcome: number }>;

@Injectable()
export class DashboardService {
    private readonly fileDownloadService = inject(FileDownloadService);
    public getTransactionsOverview(): Observable<TransactionsOverview> {
        const transactions = [...TRANSACTIONS_DATA];

        const overview = {
            monthly: this.getMonthlyOverview(transactions),
            total: this.getTotalOverview(transactions),
        };

        return of(overview).pipe(delay(1000));
    }

    public downloadTransactionsCsv(): void {
        const transactions = TRANSACTIONS_DATA.map(({ id, ...transaction }) => ({
            ...transaction,
            date: formatDate(transaction.date),
            categories: transaction.categories?.join(', '),
        }));

        const filename = `transactions_${new Date().getTime()}.csv`;
        this.fileDownloadService.downloadAsCsv(transactions, filename);
    }

    public downloadTransactionsPdf(): void {
        const headers = ['date', 'type', 'description', 'categories', 'amount'];
        const data = TRANSACTIONS_DATA.map(({ id, amount, date, type, description, categories }) => ({
            date: formatDate(date),
            type,
            description: description || 'N/A',
            categories: categories?.join(', ') || 'N/A',
            amount: `R$${amount}`,
        }));

        const filename = `transactions_${new Date().getTime()}.pdf`;
        this.fileDownloadService.downloadAsPdf(headers, data, filename);
    }

    private getMonthlyOverview(transactions: Transaction[]): MonthlyOverview {
        const currentTransactions = transactions
            .filter((transaction) => isCurrentMonth(transaction.date))
            .sort((currTrans, nextTrans) => {
                return new Date(currTrans.date).getTime() - new Date(nextTrans.date).getTime();
            });

        const totalsByDate = this.getTotalsByDate(currentTransactions);

        const overview: MonthlyOverview = {
            dates: [],
            incomes: [],
            outcomes: [],
        };

        for (const date in totalsByDate) {
            overview.dates.push(date);
            overview.incomes.push(totalsByDate[date].income);
            overview.outcomes.push(totalsByDate[date].outcome);
        }

        return overview;
    }

    private getTotalOverview(transactions: Transaction[]): TotalOverview {
        const overview = transactions.reduce(
            (acc, curr) => {
                acc[curr.type] += curr.amount;
                return acc;
            },
            { income: 0, outcome: 0 }
        );

        return { ...overview, total: overview.income - overview.outcome };
    }

    private getTotalsByDate(transactions: Transaction[]): TotalsByDate {
        const dailyTotals: TotalsByDate = {};

        transactions.forEach((transaction) => {
            const date = formatDate(transaction.date);
            if (!dailyTotals[date]) dailyTotals[date] = { income: 0, outcome: 0 };
            dailyTotals[date][transaction.type] += transaction.amount;
        });

        return dailyTotals;
    }
}
