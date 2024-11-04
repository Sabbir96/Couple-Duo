import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';
import { BillsService } from '../../../services/bills.service';
import {
  errorToastStyle,
  successToastStyle,
} from '../../../../../shared/helper/toasterFunctions';

@Component({
  selector: 'app-gas-amount',
  templateUrl: './gas-amount.component.html',
  styleUrl: './gas-amount.component.scss',
})
export class GasAmountComponent {
  title = 'Gas Bill';
  customerId: string = '';
  contactNumber: string = '';
  billingMonth: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: HotToastService,
    private spinner: NgxSpinnerService,
    private billsService: BillsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      if (
        params['customerId'] &&
        params['contactNumber'] &&
        params['billingMonth']
      ) {
        this.customerId = params['customerId'];
        this.contactNumber = params['contactNumber'];
        this.billingMonth = params['billingMonth'];
      }
    });
  }

  gasForm = this.fb.group({
    amount: ['', [Validators.required, Validators.minLength(10)]],
  });

  showErrors(controlName: string) {
    const control = this.gasForm.get(controlName);
    return control?.touched && control.invalid;
  }

  onSubmit() {
    this.spinner.show();
    if (this.gasForm.invalid) {
      return;
    }

    const payGasBillDto = {
      customerId: Number(this.customerId),
      contactNumber: Number(this.contactNumber),
      billingMonth: this.billingMonth,
      amount: Number(this.gasForm.get('amount')?.value),
    };
    this.billsService.payGasBill(payGasBillDto).subscribe({
      next: (response) => {
        this.spinner.hide();
        this.toast.success(
          'Your electricity bill has been paid.',
          successToastStyle()
        );
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
