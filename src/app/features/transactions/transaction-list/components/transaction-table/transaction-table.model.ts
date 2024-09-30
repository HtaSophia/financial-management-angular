import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

export interface TableColumn {
    name: string;
    label: string;
}

export type TablePageState = Pick<PageEvent, 'pageIndex' | 'pageSize'>;
export type TableSortState = Sort;
