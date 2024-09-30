import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Transaction } from './transaction.model';

@Injectable()
export class TransactionService {
    public getAll(): Observable<Transaction[]> {
        return of(TRANSACTIONS_DATA).pipe(delay(1000));
    }
}

const TRANSACTIONS_DATA: Transaction[] = [
    {
        id: '1',
        date: '2020-01-01',
        type: 'income',
        amount: 10000,
        description: "Robert's company payment for the project ABC",
        categories: ['client', 'project', 'website'],
    },
    {
        id: '2',
        date: '2024-01-30',
        type: 'outcome',
        amount: 2000,
        description: 'Monthly salary for Anne Lee',
        categories: ['salary', 'employee'],
    },
    {
        id: '3',
        date: '2024-04-03',
        type: 'income',
        amount: 230,
    },
    {
        id: '4',
        date: '2024-03-04',
        type: 'outcome',
        amount: 440,
        description: 'Bought desk chair for office',
        categories: ['office', 'furniture'],
    },
    {
        id: '5',
        date: '2024-02-05',
        type: 'income',
        amount: 550,
    },
    {
        id: '6',
        date: '2024-01-06',
        type: 'outcome',
        amount: 160,
    },
    {
        id: '7',
        date: '2024-02-24',
        type: 'income',
        amount: 12000,
        description: 'Payment from Jim Brown for the mobile project Dentstreet',
        categories: ['client', 'project', 'mobile'],
    },
    {
        id: '8',
        date: '2024-04-14',
        type: 'income',
        amount: 3200,
    },
    {
        id: '9',
        date: '2024-07-22',
        type: 'income',
        amount: 3000,
    },
    {
        id: '10',
        date: '2024-06-12',
        type: 'outcome',
        amount: 2000,
    },
    {
        id: '11',
        date: '2024-05-24',
        type: 'outcome',
        amount: 2000,
    },
];
