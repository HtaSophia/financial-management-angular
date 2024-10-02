import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, OnDestroy, signal, untracked, WritableSignal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TablePageState, TableSortState } from './components/transaction-table/transaction-table.model';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { TransactionService } from '../shared/transaction.service';
import { Transaction } from '../../../shared/models/transaction.model';
import { PaginationResponse } from '../../../shared/types/pagination-response';

@Component({
    selector: 'fm-transaction-list',
    standalone: true,
    imports: [MatButtonModule, MatProgressSpinnerModule, AsyncPipe, TransactionTableComponent, RouterModule],
    templateUrl: './transaction-list.component.html',
    styles: '.actions { display: flex; justify-content: flex-end; margin-bottom: 1rem; }',
})
export class TransactionListComponent implements OnDestroy {
    public transactions: WritableSignal<Transaction[]> = signal([]);
    public isLoading: WritableSignal<boolean> = signal(true);
    public totalTransactions: WritableSignal<number> = signal(0);

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
                    next: ({ data, total }) => {
                        this.transactions.set(data);
                        this.totalTransactions.set(total);
                    },
                    complete: () => this.isLoading.set(false),
                });
            });
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

    public onPageChange(pageEvent: TablePageState) {
        this.pagination.set(pageEvent);
    }

    public onSortChange(sortEvent: TableSortState) {
        this.sort.set(sortEvent);
    }

    private getTransactions(page: TablePageState, sort: TableSortState): Observable<PaginationResponse<Transaction>> {
        return this.transactionService.getAll({
            pagination: { page: page.pageIndex + 1, pageSize: page.pageSize },
            sort: { selected: sort.active, direction: sort.direction },
        });
    }
}
