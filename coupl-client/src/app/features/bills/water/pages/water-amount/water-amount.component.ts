import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BillsService } from '../../../services/bills.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngneat/hot-toast';
import {
  errorToastStyle,
  successToastStyle,
} from '../../../../../shared/helper/toasterFunctions';

@Component({
  selector: 'app-water-amount',
  templateUrl: './water-amount.component.html',
  styleUrl: './water-amount.component.scss',
})
export class WaterAmountComponent {
  title = 'Water Bill';

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
      this.spinner.hide();
      return;
    }

    const payWaterBillDto = {
      amount: Number(this.gasForm.value.amount),
      customerId: this.route.snapshot.queryParams['customerId'],
      contactNumber: this.route.snapshot.queryParams['contactNumber'],
      billingMonth: this.route.snapshot.queryParams['billingMonth'],
    };
    

    this.billsService.payWasteBill(payWaterBillDto).subscribe(
      {
        next: (response) => {
          this.spinner.hide();
          this.toast.success(
            'Your payment was successful',
            successToastStyle()
          );
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.spinner.hide();
          this.toast.error(
            'Your payment was unsuccessful',
            errorToastStyle()
          );
        },
      }
    );
  }

}
