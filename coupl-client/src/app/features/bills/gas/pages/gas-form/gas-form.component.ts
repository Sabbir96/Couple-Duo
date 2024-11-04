import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-gas-form',
  templateUrl: './gas-form.component.html',
  styleUrl: './gas-form.component.scss',
})
export class GasFormComponent {
  title = 'Gas Bill';
  months = this.getMonths();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: HotToastService
  ) {}

  pastMonthValidator = (control: FormControl) => {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      return { futureMonth: true };
    }
    return null;
  };

  gasForm = this.fb.group({
    customerId: ['', [Validators.required, Validators.minLength(10)]],
    contactNumber: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    billingMonth: [
      this.months[this.months.length - 1].value,
      [Validators.required, this.pastMonthValidator],
    ],
  });

  showErrors(controlName: string) {
    const control = this.gasForm.get(controlName);
    return control?.touched && control.invalid;
  }

  onSubmit() {
    if (this.gasForm.invalid) {
      return;
    }

    const { customerId, contactNumber, billingMonth } = this.gasForm.value;
    this.router.navigate(['/bills/gas/amount'], {
      queryParams: { customerId, contactNumber, billingMonth },
    });
  }

  getMonths() {
    const months = [];
    const date = new Date();
    date.setMonth(date.getMonth() + 1);

    for (let i = 0; i < 12; i++) {
      date.setMonth(date.getMonth() - 1);
      months.push({
        name: `${date.toLocaleString('default', {
          month: 'long',
        })} ${date.getFullYear()}`,
        value: `${date.getMonth() + 1}-${date.getFullYear()}`,
      });
    }

    return months;
  }
}
