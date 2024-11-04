import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';
import { BillsService } from '../../../bills/services/bills.service';

@Component({
  selector: 'app-request-money-email',
  templateUrl: './request-money-email.component.html',
  styleUrl: './request-money-email.component.scss',
})
export class RequestMoneyEmailComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: HotToastService,
    private spinner: NgxSpinnerService,
    private billsService: BillsService
  ) {}

  requestMoneyEmailForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    ],
  });

  onSubmit() {
    if (this.requestMoneyEmailForm.invalid) {
      return;
    }
    const email = this.requestMoneyEmailForm.value.email;
    this.router.navigate(['/send-money-amount', email]);
  }
}
