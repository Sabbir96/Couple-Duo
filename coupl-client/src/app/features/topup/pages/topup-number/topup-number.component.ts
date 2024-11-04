import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-topup-number',
  templateUrl: './topup-number.component.html',
  styleUrl: './topup-number.component.scss',
})
export class TopupNumberComponent {
  operator: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.operator = params['operator'];
    });
  }

  phoneNumberForm = this.fb.group({
    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
  });

  // console.log(this.operator);

  onSubmit() {
    if (this.phoneNumberForm.invalid) {
      return;
    }
    const phoneNumber = this.phoneNumberForm.value.phoneNumber;
    const operator = this.operator;
    this.router.navigate(['/topup-amount'], {
      queryParams: { phoneNumber, operator },
    });
  }
}
