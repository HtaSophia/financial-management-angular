type TransactionType = 'income' | 'outcome';

export interface Transaction {
    id: string;
    amount: number;
    categories?: string[];
    date: string;
    description?: string;
    type: TransactionType;
}
