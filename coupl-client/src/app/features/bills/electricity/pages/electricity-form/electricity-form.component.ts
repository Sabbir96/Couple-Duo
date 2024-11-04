import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-electricity-form',
  templateUrl: './electricity-form.component.html',
  styleUrls: ['./electricity-form.component.scss'],
})
export class ElectricityFormComponent {
  title = 'Electricity Bill';
  months = this.getMonths();

  constructor(private fb: FormBuilder, private router: Router) {}

  pastMonthValidator = (control: FormControl) => {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      return { futureMonth: true };
    }
    return null;
  };

  electricityForm = this.fb.group({
    meterNumber: ['', [Validators.required, Validators.minLength(10)]],
    contactNumber: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$'),
      ],
    ],
    billingMonth: [
      this.months[this.months.length - 1].value,
      [Validators.required, this.pastMonthValidator],
    ],
  });

  showErrors(controlName: string) {
    const control = this.electricityForm.get(controlName);
    return control?.touched && control.invalid;
  }

  onSubmit() {
    const meterNumber = this.electricityForm.get('meterNumber')?.value;
    const contactNumber = this.electricityForm.get('contactNumber')?.value;
    const billingMonth = this.electricityForm.get('billingMonth')?.value;

    this.router.navigate(['/bills/electricity/amount'], {
      queryParams: { meterNumber, contactNumber, billingMonth },
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
