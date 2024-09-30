import { Transaction } from '../models/transaction.model';

export const TRANSACTIONS_DATA: Transaction[] = [
    {
        id: '1',
        date: '2024-09-01T00:00:00.000-04:00',
        type: 'income',
        amount: 10000,
        description: "Robert's company payment for the project ABC",
        categories: ['client', 'project', 'website'],
    },
    {
        id: '2',
        date: '2024-01-30T00:00:00.000-04:00',
        type: 'outcome',
        amount: 2000,
        description: 'Monthly salary for Anne Lee',
        categories: ['salary', 'employee'],
    },
    {
        id: '3',
        date: '2024-04-03T00:00:00.000-04:00',
        type: 'income',
        amount: 230,
    },
    {
        id: '4',
        date: '2024-09-04T00:00:00.000-04:00',
        type: 'outcome',
        amount: 440,
        description: 'Bought desk chair for office',
        categories: ['office', 'furniture'],
    },
    {
        id: '5',
        date: '2024-09-04T00:00:00.000-04:00',
        type: 'income',
        amount: 550,
    },
    {
        id: '6',
        date: '2024-09-06T00:00:00.000-04:00',
        type: 'outcome',
        amount: 160,
    },
    {
        id: '7',
        date: '2024-02-24T00:00:00.000-04:00',
        type: 'income',
        amount: 12000,
        description: 'Payment from Jim Brown for the mobile project Dentstreet',
        categories: ['client', 'project', 'mobile'],
    },
    {
        id: '8',
        date: '2024-04-14T00:00:00.000-04:00',
        type: 'income',
        amount: 3200,
    },
    {
        id: '9',
        date: '2024-07-22T00:00:00.000-04:00',
        type: 'income',
        amount: 3000,
    },
    {
        id: '10',
        date: '2024-06-12T00:00:00.000-04:00',
        type: 'outcome',
        amount: 2000,
    },
    {
        id: '11',
        date: '2024-05-24T00:00:00.000-04:00',
        type: 'outcome',
        amount: 2000,
    },
];
