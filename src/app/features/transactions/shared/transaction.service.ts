import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Transaction } from '../../../shared/models/transaction.model';
import { TRANSACTIONS_DATA } from '../../../shared/mocks/transactions.mock';

@Injectable()
export class TransactionService {
    public getAll(): Observable<Transaction[]> {
        return of(TRANSACTIONS_DATA).pipe(delay(1000));
    }
}
