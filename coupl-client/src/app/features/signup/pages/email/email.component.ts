import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngneat/hot-toast';
import {
  errorToastStyle,
  successToastStyle,
} from '../../../../shared/helper/toasterFunctions';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss',
})
export class EmailComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(
    private signUpService: SignupService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: HotToastService
  ) {}

  checkEmail() {
    if (this.email.invalid) {
      return;
    }
    this.spinner.show();

    this.signUpService
      .checkDuplicateEmail(this.email.value)
      .subscribe((res: any) => {
        this.spinner.hide();

        this.saveToLocalStorage();
        if (res?.available === true) {
          this.toast.success(
            'Email Verified Successfully.',
            successToastStyle()
          );
          this.router.navigate(['/signup/otp']);
        }
        if (res?.available === false) {
          this.toast.error('Email already exists.', errorToastStyle());
        }
        return;
      });
  }

  saveToLocalStorage() {
    this.signUpService.saveToLocalStorage('email_address', this.email.value);
  }

 

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
