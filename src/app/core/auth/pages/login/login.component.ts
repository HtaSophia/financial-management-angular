import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Store } from '@ngrx/store';
import { logIn } from '../../store/auth.actions';

@Component({
    selector: 'fm-login',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    public emailControl = new FormControl('', [Validators.required, Validators.email]);
    public passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

    private readonly store = inject(Store);

    public onSubmit(): void {
        if (this.emailControl.valid && this.passwordControl.valid) {
            this.store.dispatch(logIn({ email: this.emailControl.value! }));
        }
    }
}
