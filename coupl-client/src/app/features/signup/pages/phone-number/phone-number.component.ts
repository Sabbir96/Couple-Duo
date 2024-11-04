import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrl: './phone-number.component.scss',
})
export class PhoneNumberComponent {
  constructor(private router: Router, private signUpService: SignupService) {}

  phonenumber = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);

  goToNextPage() {
    this.signUpService.saveToLocalStorage(
      'phone_number',
      this.phonenumber.value
    );
    this.router.navigate(['/signup/passcode']);
  }

  getErrorMessage() {
    if (this.phonenumber.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.phonenumber.hasError('pattern')) {
      return 'Only numbers are allowed';
    }

    if (
      this.phonenumber.hasError('minlength') ||
      this.phonenumber.hasError('maxlength')
    ) {
      return 'Phone number must be exactly 10 digits';
    }

    return '';
  }
}
