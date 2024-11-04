import { Component, ViewChild } from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { SignupService } from '../../services/signup.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { errorToastStyle } from '../../../../shared/helper/toasterFunctions';

@Component({
  selector: 'app-dob',
  templateUrl: './dob.component.html',
  styleUrl: './dob.component.scss',
})
export class DobComponent {
  constructor(
    private signUpService: SignupService,
    private router: Router,
    private toast: HotToastService
  ) {}

  events: string[] = [];
  isEighteenOrOlder: boolean = true;

  saveDateOfBirth(event: MatDatepickerInputEvent<Date>) {
    const date = event.value;

    // Check if date is not null or undefined
    if (!date) {
      console.error('Date is null or undefined');
      this.toast.error('Date is null or undefined', errorToastStyle());
      return;
    }

    // Calculate age
    const age = this.calculateAge(date);
    this.isEighteenOrOlder = age >= 18;

    // Check if user is 18 or older
    if (!this.isEighteenOrOlder) {
      console.error('User is not 18 or older');
      this.toast.error('User is not 18 or older', errorToastStyle());
      return;
    }

    // Convert the date to the format yyyy-mm-dd
    const convertedDateOfBirth = `${date.getFullYear()}-${(
      '0' +
      (date.getMonth() + 1)
    ).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;

    // Save the dob in the local storage
    this.signUpService.saveToLocalStorage(
      'date_of_birth',
      convertedDateOfBirth
    );
  }
  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const m = today.getMonth() - dateOfBirth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    return age;
  }
  onNextClick() {
    this.router.navigate(['/signup/document']);
  }
}
