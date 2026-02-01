import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { EmailValidator } from '../../../shared/utils/custom-validators';
import { SelectInputComponent } from '../../../components/select-input/select-input.component';
import { DatePickerComponent } from '../../../components/date-picker/date-picker.component';
import { AuthService } from '../../../../services/auth.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputComponent,
    ButtonComponent,
    SelectInputComponent,
    DatePickerComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [EmailValidator(), Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  private authService = inject(AuthService);
  private router = inject(Router);
  private $destroy: Subject<void> = new Subject<void>();
  public loading: boolean = false;
  public buttonDisabled: boolean = true;
  public errorMessage: string = '';

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.$destroy))
      .subscribe(() => {
        this.buttonDisabled = this.form.status === 'INVALID';
        this.errorMessage = '';
      });
  }

  public login(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control?.markAsDirty({ onlySelf: true });
      });
      return;
    }

    this.buttonDisabled = true;
    this.loading = true;
    this.authService
      .signIn(this.form.value.email, this.form.value.password)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      })
      .catch(() => {
        this.errorMessage = 'Usuario o contraseña incorrectos.';
        this.loading = false;
        this.buttonDisabled = false;
      });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
