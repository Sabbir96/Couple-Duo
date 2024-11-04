import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  errorToastStyle,
  successToastStyle,
} from '../../../../shared/helper/toasterFunctions';
import { SendMoneyService } from '../services/send-money.service';

@Component({
  selector: 'app-send-money-amount',
  templateUrl: './send-money-amount.component.html',
  styleUrl: './send-money-amount.component.scss',
})
export class SendMoneyAmountComponent {
  // get email from route params and set it to a property
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: HotToastService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private sendMoneyService: SendMoneyService
  ) {
    // get email from route params and set it to a property
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
  }

  sendMoneyForm = this.fb.group({
    amount: ['', [Validators.required, Validators.min(1)]],
  });

  onSubmit() {
    this.spinner.show();
    if (this.sendMoneyForm.invalid) {
      this.toast.error('Invalid Form', errorToastStyle());
      return;
    }
    const amount = Number(this.sendMoneyForm.value.amount);
    const receiver = this.email;
    const data = { amount, receiver };
    this.sendMoneyService.sendMoneyInside(data).subscribe(
      {
        next: (res) => {
          this.spinner.hide();
          this.toast.success('Money Sent', successToastStyle());
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.spinner.hide();
          this.toast.error(err.error.message, errorToastStyle());
        },
      }
    );
  }
}
