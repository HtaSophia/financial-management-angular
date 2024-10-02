import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Transaction } from '../../../shared/models/transaction.model';
import { TRANSACTIONS_DATA } from '../../../shared/mocks/transactions.mock';
import { PaginationResponse } from '../../../shared/types/pagination-response';

interface Sort {
    selected: 'date' | 'type' | 'amount';
    direction: 'asc' | 'desc';
}

interface TransactionQueryOptions {
    search?: string;
    pagination?: {
        page: number;
        pageSize: number;
    };
    sort?: Sort;
}

@Injectable()
export class TransactionService {
    private transactions = [...TRANSACTIONS_DATA];

    public create(transaction: Transaction): Observable<Transaction> {
        const lastId = this.transactions.at(-1)?.id ?? '0';
        const id = `${parseInt(lastId) + 1}`;
        this.transactions.push({ ...transaction, id });
        return of(transaction).pipe(delay(1000));
    }

    public getAll(options: TransactionQueryOptions): Observable<PaginationResponse<Transaction>> {
        let transactions = [...this.transactions];

        if (options.search) {
            transactions = transactions.filter((transaction) =>
                transaction.description?.toLowerCase().includes(options.search!.toLowerCase())
            );
        }

        if (options.sort) {
            transactions = this.sortTransactions(transactions, options.sort);
        }

        const total = transactions.length;
        if (options.pagination) {
            transactions = this.paginateTransactions(transactions, options.pagination);
        }

        return of({ data: transactions, total }).pipe(delay(1000));
    }

    private sortTransactions(transactions: Transaction[], sort: Sort): Transaction[] {
        const sortFn = {
            date: {
                asc: (currTran: Transaction, nextTran: Transaction) => {
                    return new Date(currTran.date).getTime() - new Date(nextTran.date).getTime();
                },
                desc: (currTran: Transaction, nextTran: Transaction) => {
                    return new Date(nextTran.date).getTime() - new Date(currTran.date).getTime();
                },
            },
            type: {
                asc: (currTran: Transaction, nextTran: Transaction) => currTran.type.localeCompare(nextTran.type),
                desc: (currTran: Transaction, nextTran: Transaction) => nextTran.type.localeCompare(currTran.type),
            },
            amount: {
                asc: (currTran: Transaction, nextTran: Transaction) => currTran.amount - nextTran.amount,
                desc: (currTran: Transaction, nextTran: Transaction) => nextTran.amount - currTran.amount,
            },
        }[sort.selected][sort.direction];

        return transactions.sort((currTran, nextTran) => sortFn(currTran, nextTran));
    }

    private paginateTransactions(
        transactions: Transaction[],
        pagination: { page: number; pageSize: number }
    ): Transaction[] {
        return [...transactions].slice(
            (pagination.page - 1) * pagination.pageSize,
            pagination.page * pagination.pageSize
        );
    }
}
