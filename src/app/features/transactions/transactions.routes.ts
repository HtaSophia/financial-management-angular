import { Route } from '@angular/router';

import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

export default [
    { path: '', title: 'Transactions', component: TransactionListComponent },
    { path: 'form', title: 'Transaction Form', component: TransactionFormComponent },
] satisfies Route[];
