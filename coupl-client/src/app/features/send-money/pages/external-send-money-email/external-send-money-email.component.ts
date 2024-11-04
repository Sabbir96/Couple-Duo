import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';
import { BillsService } from '../../../bills/services/bills.service';

@Component({
  selector: 'app-external-send-money-email',
  templateUrl: './external-send-money-email.component.html',
  styleUrl: './external-send-money-email.component.scss',
})
export class ExternalSendMoneyEmailComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: HotToastService,
    private spinner: NgxSpinnerService,
    private billsService: BillsService
  ) {}

  sendExternalMoneyForm = this.fb.group({
    name: ['', [Validators.required]],
    accountNumber: ['', [Validators.required]],
    routingNumber: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.sendExternalMoneyForm.invalid) {
      return;
    }
    const { name, accountNumber, routingNumber } =
      this.sendExternalMoneyForm.value;

    // send this email to query params
    this.router.navigate(['/send-money-external-amount'], {
      queryParams: { name, accountNumber, routingNumber },
    });
  }
}
