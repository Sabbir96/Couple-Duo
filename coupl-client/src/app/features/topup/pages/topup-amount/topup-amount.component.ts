import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BillsService } from '../../../bills/services/bills.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngneat/hot-toast';
import {
  errorToastStyle,
  successToastStyle,
} from '../../../../shared/helper/toasterFunctions';

@Component({
  selector: 'app-topup-amount',
  templateUrl: './topup-amount.component.html',
  styleUrl: './topup-amount.component.scss',
})
export class TopupAmountComponent {
  phoneNumber: string = '';
  operator: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: HotToastService,
    private spinner: NgxSpinnerService,
    private billsService: BillsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.phoneNumber = params['phoneNumber'];
      this.operator = params['operator'];
    });
  }

  amountForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  });

  onSubmit() {
    this.spinner.show();

    if (this.amountForm.invalid) {
      this.spinner.hide();
      return;
    }

    const amount = Number(this.amountForm.value.amount);
    const operator = this.operator;

    this.billsService
      .payTelecommunicationsBill({ amount, operator })
      .subscribe({
        next: (response) => {
          this.spinner.hide();
          this.toast.success('Topup successful!', successToastStyle());
        },
        error: (error) => {
          this.spinner.hide();
          this.toast.error(
            error.error.message || 'Oops - Something went wrong',
            errorToastStyle()
          );
        },
        complete: () => {
          this.spinner.hide();
          this.router.navigate(['/home']);
        },
      });
  }
}
