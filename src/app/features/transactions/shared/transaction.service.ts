import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Transaction } from '../../../shared/models/transaction.model';
import { TRANSACTIONS_DATA } from '../../../shared/mocks/transactions.mock';

@Injectable()
export class TransactionService {
    private transactions = [...TRANSACTIONS_DATA];

    public create(transaction: Transaction): Observable<Transaction> {
        const lastId = this.transactions.at(-1)?.id ?? '0';
        const id = `${parseInt(lastId) + 1}`;
        this.transactions.push({ ...transaction, id });
        return of(transaction).pipe(delay(1000));
    }

    public getAll(): Observable<Transaction[]> {
        return of(this.transactions).pipe(delay(1000));
    }
}
