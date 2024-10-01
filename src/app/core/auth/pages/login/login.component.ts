import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../auth.service';

@Component({
    selector: 'fm-login',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    public emailControl = new FormControl('', [Validators.required, Validators.email]);
    public passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    public onSubmit(): void {
        this.authService.login(this.emailControl.value!);
        this.router.navigate(['dashboard']);
    }
}
