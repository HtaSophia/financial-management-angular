import { Component, effect, inject, OnDestroy, signal, untracked, WritableSignal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, Subscription } from 'rxjs';

import { TransactionService } from '../shared/transaction.service';
import { Transaction } from '../../../shared/models/transaction.model';

import { TablePageState, TableSortState } from './components/transaction-table/transaction-table.model';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';

@Component({
    selector: 'fm-transaction-list',
    standalone: true,
    imports: [MatProgressSpinnerModule, AsyncPipe, TransactionTableComponent],
    templateUrl: './transaction-list.component.html',
    styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent implements OnDestroy {
    public transactions: WritableSignal<Transaction[]> = signal([]);
    public isLoading: WritableSignal<boolean> = signal(true);

    private transactionService = inject(TransactionService);
    private pagination: WritableSignal<TablePageState> = signal({ pageIndex: 0, pageSize: 5 });
    private sort: WritableSignal<TableSortState> = signal({ active: 'date', direction: 'desc' });
    private subscription?: Subscription;

    constructor() {
        effect(() => {
            const page = this.pagination();
            const sort = this.sort();

            untracked(() => {
                this.isLoading.set(true);
                if (this.subscription) this.subscription.unsubscribe();
                this.subscription = this.getTransactions(page, sort).subscribe({
                    next: (transactions) => {
                        console.log('TRANSACTIONS', typeof transactions);
                        this.transactions.set(transactions);
                    },
                    complete: () => {
                        this.isLoading.set(false);
                    },
                });
            });
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

    public onPageChange(pageEvent: TablePageState) {
        console.log('PAGE', pageEvent);
        this.pagination.set(pageEvent);
    }

    public onSortChange(sortEvent: TableSortState) {
        console.log('SORT', sortEvent);
        this.sort.set(sortEvent);
    }

    private getTransactions(page: TablePageState, sort: TableSortState): Observable<Transaction[]> {
        return this.transactionService.getAll();
    }
}
