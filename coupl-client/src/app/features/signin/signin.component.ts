import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignupRoutingModule } from '../signup/signup-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { SigninService } from './signin.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngneat/hot-toast';
import {
  errorToastStyle,
  successToastStyle,
} from '../../shared/helper/toasterFunctions';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from '../../shared/shared.module';
import { CookiesService } from '../../shared/services/cookies.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SignupRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxSpinnerModule,
    SharedModule,
  ],
  providers: [CookieService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  constructor(
    private router: Router,
    private signInService: SigninService,
    private spinner: NgxSpinnerService,
    private toast: HotToastService,
    private cookiesService: CookiesService
  ) {}

  email = new FormControl('', [Validators.required, Validators.email]);
  passcode = new FormControl(0, [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern('^[0-9]*$'),
  ]);

  signIn() {
    this.spinner.show();

    if (this.email.invalid || this.passcode.invalid) {
      this.spinner.hide();
      this.toast.error('Invalid email or passcode', errorToastStyle());
      return;
    }

    this.signInService.signIn(this.email.value, this.passcode.value).subscribe({
      next: (res) => {
        this.spinner.hide();

        if (res && res?.access_token) {
          this.cookiesService.saveAccessToken(res.access_token, res.expires_in);
          const emailAddress = this.email.value || '';
          this.cookiesService.saveToCookies(
            'email_address',
            emailAddress,
            res.expires_in
          );
          this.toast.success('Sign in successful', successToastStyle());
          this.router.navigate(['/home']);
        } else {
          this.toast.error('Sign in failed', errorToastStyle());
        }
      },

      error: (err) => {
        this.spinner.hide();

        if (err.status === 401) {
          this.toast.error('Invalid email or passcode', errorToastStyle());
        }

        if (err.status === 500) {
          this.toast.error('An error occurred', errorToastStyle());
        }

        if (err.status === 400) {
          this.toast.error('Invalid email or passcode', errorToastStyle());
        }

        if (err.status === 404) {
          this.toast.error('Invalid email or passcode', errorToastStyle());
        }

        if (err.status === 409) {
          this.toast.error('Invalid email or passcode', errorToastStyle());
        }
      },
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.passcode.hasError('required')) {
      return 'You must enter digits';
    }

    if (this.passcode.hasError('minlength')) {
      return 'Passcode must be 6 digits';
    }

    if (this.passcode.hasError('maxlength')) {
      return 'Passcode must be 6 digits';
    }

    if (this.passcode.hasError('pattern')) {
      return 'Passcode must be 6 digits';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
