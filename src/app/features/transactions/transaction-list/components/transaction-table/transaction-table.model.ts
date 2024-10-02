import { PageEvent } from '@angular/material/paginator';

export interface TableColumn {
    name: string;
    label: string;
}

export type TablePageState = Pick<PageEvent, 'pageIndex' | 'pageSize'>;
export interface TableSortState {
    active: 'date' | 'type' | 'amount';
    direction: 'asc' | 'desc';
}
