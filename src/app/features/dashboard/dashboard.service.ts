import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { MonthlyOverview, TotalOverview, TransactionsOverview } from './models/dashboard.model';

import { formatDate, isCurrentMonth } from '../../shared/utils/date.util';
import { TRANSACTIONS_DATA } from '../../shared/mocks/transactions.mock';
import { Transaction } from '../../shared/models/transaction.model';

type TotalsByDate = Record<string, { income: number; outcome: number }>;

@Injectable()
export class DashboardService {
    public getTransactionsOverview(): Observable<TransactionsOverview> {
        const transactions = [...TRANSACTIONS_DATA];

        const overview = {
            monthly: this.getMonthlyOverview(transactions),
            total: this.getTotalOverview(transactions),
        };

        return of(overview).pipe(delay(1000));
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
