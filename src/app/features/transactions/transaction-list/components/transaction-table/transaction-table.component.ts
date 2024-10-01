import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    WritableSignal,
    signal,
} from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { TablePageState, TableSortState } from './transaction-table.model';
import { TRANSACTION_TABLE_COLUMNS, TRANSACTION_TABLE_PAGE_SIZE_OPTIONS } from '../../transaction-list.constant';
import { Transaction } from '../../../../../shared/models/transaction.model';

const IMPORTS = [
    CurrencyPipe,
    DatePipe,
    MatChipsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
];

@Component({
    selector: 'fm-transaction-table',
    standalone: true,
    imports: IMPORTS,
    templateUrl: './transaction-table.component.html',
    styles: [
        '.container { display: flex; justify-content: center; align-items: center; }',
        '.table-container { overflow-x: auto; }',
        'section { padding: 1rem; background-color: white; }',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionTableComponent implements OnChanges {
    @Input() public data: Transaction[] = [];
    @Input() public isLoading = false;
    @Output() public pageChange = new EventEmitter<TablePageState>();
    @Output() public sortChange = new EventEmitter<TableSortState>();

    public readonly displayedColumns: string[] = TRANSACTION_TABLE_COLUMNS;
    public readonly pageSizeOptions: number[] = TRANSACTION_TABLE_PAGE_SIZE_OPTIONS;
    public page: WritableSignal<PageEvent> = signal({ pageIndex: 0, pageSize: 5, length: 0 });
    public sort: WritableSignal<Sort> = signal({ active: '', direction: '' });

    private liveAnnouncer = inject(LiveAnnouncer);

    ngOnChanges(changes: SimpleChanges) {
        if (changes['data']) {
            this.page.update((pageState) => ({ ...pageState, length: changes['data'].currentValue.length }));
        }
    }

    public onSortChange(sortState: Sort) {
        //  Announce the change in sort state for assistive technology.
        if (sortState.direction) {
            this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this.liveAnnouncer.announce('Sorting cleared');
        }

        this.sort.set(sortState);
        this.sortChange.emit(sortState);
    }

    public onPageChange(pageEvent: PageEvent) {
        this.page.set({ ...pageEvent });
        this.pageChange.emit({ pageIndex: pageEvent.pageIndex, pageSize: pageEvent.pageSize });
    }
}
