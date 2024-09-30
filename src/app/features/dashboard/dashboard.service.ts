import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { MonthlyOverview } from './models/dashboard.model';

import { formatDate, isCurrentMonth } from '../../shared/utils/date.util';
import { TRANSACTIONS_DATA } from '../../shared/mocks/transactions.mock';

@Injectable()
export class DashboardService {
    public getMonthlyOverview(): Observable<MonthlyOverview> {
        const transactions = [...TRANSACTIONS_DATA];

        const currentTransactions = transactions
            .filter((transaction) => isCurrentMonth(transaction.date))
            .sort((currTrans, nextTrans) => {
                return new Date(currTrans.date).getTime() - new Date(nextTrans.date).getTime();
            });

        const overview: MonthlyOverview = {
            dates: [],
            incomes: [],
            outcomes: [],
        };

        currentTransactions.forEach((transaction) => {
            overview.dates.push(formatDate(transaction.date));
            overview.incomes.push(transaction.type === 'income' ? transaction.amount : 0);
            overview.outcomes.push(transaction.type === 'outcome' ? transaction.amount : 0);
        });

        return of(overview).pipe(delay(1000));
    }
}
