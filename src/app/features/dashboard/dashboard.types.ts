export interface MonthlyOverview {
    dates: string[];
    incomes: number[];
    outcomes: number[];
}

export interface TotalOverview {
    income: number;
    outcome: number;
    total: number;
}

export interface TransactionsOverview {
    monthly: MonthlyOverview;
    total: TotalOverview;
}
