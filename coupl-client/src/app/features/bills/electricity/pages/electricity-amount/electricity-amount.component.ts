import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';
import { BillsService } from '../../../services/bills.service';
import {
  errorToastStyle,
  successToastStyle,
} from '../../../../../shared/helper/toasterFunctions';

@Component({
  selector: 'app-electricity-amount',
  templateUrl: './electricity-amount.component.html',
  styleUrl: './electricity-amount.component.scss',
})
export class ElectricityAmountComponent {
  title = 'Electricity Bill';

  meterNumber: string = '';
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
        params['meterNumber'] &&
        params['contactNumber'] &&
        params['billingMonth']
      ) {
        this.meterNumber = params['meterNumber'];
        this.contactNumber = params['contactNumber'];
        this.billingMonth = params['billingMonth'];
      }
    });
  }

  electricityForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  });

  showErrors(controlName: string) {
    const control = this.electricityForm.get(controlName);
    return control?.touched && control.invalid;
  }

  onSubmit() {
    this.spinner.show();
    if (this.electricityForm.invalid) {
      return;
    }

    const payElectricityBillDto = {
      meterNumber: Number(this.meterNumber),
      contactNumber: Number(this.contactNumber),
      billingMonth: this.billingMonth,
      amount: Number(this.electricityForm.get('amount')?.value),
    };
    this.billsService.payElectricityBill(payElectricityBillDto).subscribe({
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
