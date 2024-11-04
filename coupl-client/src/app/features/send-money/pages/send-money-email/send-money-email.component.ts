import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';
import { BillsService } from '../../../bills/services/bills.service';

@Component({
  selector: 'app-send-money-email',
  templateUrl: './send-money-email.component.html',
  styleUrl: './send-money-email.component.scss',
})
export class SendMoneyEmailComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: HotToastService,
    private spinner: NgxSpinnerService,
    private billsService: BillsService
  ) {}

  sendMoneyForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    ],
  });

  onSubmit() {
    if (this.sendMoneyForm.invalid) {
      return;
    }
    const email = this.sendMoneyForm.value.email;
    // send this email to query params
    this.router.navigate(['/send-money-amount'], { queryParams: { email } });
  }
}
