import { HotToastService } from '@ngneat/hot-toast';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import {
  errorToastStyle,
  successToastStyle,
} from '../../../../shared/helper/toasterFunctions';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent implements OnInit {
  constructor(
    private router: Router,
    private signUpService: SignupService,
    private toast: HotToastService
  ) {}

  email: string = '';

  ngOnInit(): void {
    this.email = this.signUpService.getEmailFromLocalStorage();
    this.signUpService.getOtp().subscribe((res: any) => {
      if (res.success === true) {
        this.toast.success('OTP sent successfully', successToastStyle());
      }
    });
  }

  otp = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.minLength(6),
    Validators.maxLength(6),
  ]);

  verifyOtp() {
    this.signUpService.verifyOtp(this.otp.value).subscribe({
      next: (res) => {
        if (res.verified === true) {
          this.toast.success('OTP verified successfully', successToastStyle());
          this.router.navigate(['/signup/camera']);
        }
        if (res.verified === false) {
          this.toast.success('Invalid OTP', errorToastStyle());
        }
      },
      error: (err) => {
        this.toast.error(`${err.status}: ${err.error.message}`);
      },
    });
  }

  getErrorMessage() {
    if (this.otp.hasError('required')) {
      return 'You must enter a value';
    }
    return this.otp.hasError('otp')
      ? 'Not a valid otp'
      : this.otp.hasError('minlength')
      ? 'Otp must be 6 digits'
      : 'OTP must be numbers only';
  }
}
