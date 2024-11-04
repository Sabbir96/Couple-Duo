import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BillsService } from '../../../services/bills.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngneat/hot-toast';
import {
  errorToastStyle,
  successToastStyle,
} from '../../../../../shared/helper/toasterFunctions';

@Component({
  selector: 'app-waste-amount',
  templateUrl: './waste-amount.component.html',
  styleUrl: './waste-amount.component.scss',
})
export class WasteAmountComponent {
  title = 'Waste Bill';
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

  wasteForm = this.fb.group({
    amount: ['', [Validators.required, Validators.minLength(10)]],
  });

  showErrors(controlName: string) {
    const control = this.wasteForm.get(controlName);
    return control?.touched && control.invalid;
  }

  onSubmit() {
    this.spinner.show();

    if (this.wasteForm.invalid) {
      this.spinner.hide();
      return;
    }
    const payWasteBillDto = {
      customerId: Number(this.customerId),
      contactNumber: Number(this.contactNumber),
      billingMonth: this.billingMonth,
      amount: Number(this.wasteForm.get('amount')?.value),
    };

    this.billsService.payWasteBill(payWasteBillDto).subscribe({
      next: (response) => {
        this.spinner.hide();
        this.toast.success('Waste bill paid successfully', successToastStyle());
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.spinner.hide();
        this.toast.error(error.error.message, errorToastStyle());
      },
    });
  }
}
