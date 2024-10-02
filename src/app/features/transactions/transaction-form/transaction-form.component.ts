import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, signal, WritableSignal, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { TransactionService } from '../shared/transaction.service';

const IMPORTS = [
    ReactiveFormsModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
];

@Component({
    selector: 'fm-transaction-form',
    standalone: true,
    imports: IMPORTS,
    providers: [provideNativeDateAdapter()],
    templateUrl: './transaction-form.component.html',
    styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent implements OnDestroy {
    public readonly addedCategories: WritableSignal<string[]> = signal([]);
    public readonly maxDate = new Date();
    public form: FormGroup;

    private readonly announcer = inject(LiveAnnouncer);
    private readonly fb = inject(FormBuilder);
    private readonly transactionService = inject(TransactionService);
    private readonly router = inject(Router);
    private subscription?: Subscription;

    constructor() {
        this.form = this.fb.group({
            date: ['', [Validators.required]],
            description: '',
            amount: ['', [Validators.required, Validators.min(0)]],
            categories: [''],
            type: ['', [Validators.required]],
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public onSubmit(): void {
        this.subscription = this.transactionService.create(this.form.value).subscribe(() => {
            this.router.navigate(['/transactions']);
        });
    }

    public onAddCategory(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            this.addedCategories.update((categories) => [...categories, value]);
            this.announcer.announce(`Added ${value} to categories field`);
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    public onRemoveCategory(category: string): void {
        this.addedCategories.update((categories) => {
            const index = categories.indexOf(category);
            if (index < 0) {
                return categories;
            }

            categories.splice(index, 1);
            this.announcer.announce(`Removed ${category} from categories field`);
            return [...categories];
        });
    }
}
