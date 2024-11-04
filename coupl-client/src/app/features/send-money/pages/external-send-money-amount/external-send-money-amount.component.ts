import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';
import { SendMoneyService } from '../services/send-money.service';
import { errorToastStyle } from '../../../../shared/helper/toasterFunctions';
import { SendMoneyOutsideDto } from '../../models/sendmoney.model';

@Component({
  selector: 'app-external-send-money-amount',
  templateUrl: './external-send-money-amount.component.html',
  styleUrl: './external-send-money-amount.component.scss',
})
export class ExternalSendMoneyAmountComponent {
  // get email from route params and set it to a property
  name: string = '';
  accountNumber: string = '';
  routingNumber: string = '';

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
      this.name = params['name'];
      this.accountNumber = params['accountNumber'];
      this.routingNumber = params['routingNumber'];
    });
  }

  sendExternalMoneyForm = this.fb.group({
    amount: ['', [Validators.required, Validators.min(1)]],
  });

  onSubmit() {
    this.spinner.show();

    if (this.sendExternalMoneyForm.invalid) {
      this.toast.error('Invalid Form', errorToastStyle());
      return;
    }

    const sendMoneyOutsideDto: SendMoneyOutsideDto = {
      name: this.name,
      accountNumber: this.accountNumber,
      routingNumber: this.routingNumber,
      amount: Number(this.sendExternalMoneyForm.value.amount),
    };

    this.sendMoneyService.SendMoneyOutside(sendMoneyOutsideDto).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.toast.success('Money sent successfully');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.spinner.hide();
        this.toast.error(err.error.message, errorToastStyle());
      },
    });
  }
}
