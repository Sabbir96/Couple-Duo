import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddMoneyService } from '../../services/add-money.service';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  errorToastStyle,
  successToastStyle,
} from '../../../../shared/helper/toasterFunctions';

@Component({
  selector: 'app-card-to-duo-form',
  templateUrl: './card-to-duo-form.component.html',
  styleUrl: './card-to-duo-form.component.scss',
})
export class CardToDuoFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private addMoneyService: AddMoneyService,
    private spinner: NgxSpinnerService,
    private toast: HotToastService
  ) {}

  cardType: string | null = null;

  ngOnInit(): void {
    this.cardType =
      this.router.routerState.snapshot.root.firstChild?.params['cardType'];
  }

  cardToDuoForm = this.fb.group({
    name: ['', [Validators.required]],
    cardNumber: ['', [Validators.required]],
    expirationDate: [
      '',
      [
        Validators.required,
        Validators.pattern('(0[1-9]|1[0-2])/([0-9]{2})'),
        this.futureDateValidator,
      ],
    ],
    cvv: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    amount: [
      '',
      [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')],
    ],
  });

  addSlash(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let cleanInput = input.value.replace(/\D/g, '');
    cleanInput = cleanInput.slice(0, 4);
    if (cleanInput.length > 2) {
      cleanInput = cleanInput.slice(0, 2) + '/' + cleanInput.slice(2);
    }
    input.value = cleanInput;
  }

  futureDateValidator(control: FormControl): { [s: string]: boolean } | null {
    if (!control.value) {
      return null;
    }
    const [month, year] = control.value
      .split('/')
      .map((val: string) => parseInt(val, 10));
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { futureDate: true };
    }
    return null;
  }

  onKeyupCardNumber(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const cardNumber = input.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1-').replace(/-$/, '');
    this.cardToDuoForm.controls.cardNumber.setValue(cardNumber);
    console.log(this.cardToDuoForm.controls.cardNumber.value);
  }

  onSubmit() {
    this.spinner.show();
    if (this.cardToDuoForm.valid) {
      this.addMoneyService.addMoneyToDuo(this.cardToDuoForm.value).subscribe({
        next: (response) => {
          this.spinner.hide();
          this.toast.success(
            `Successfully added $${this.cardToDuoForm.value.amount} to your account`,
            successToastStyle()
          );
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.spinner.hide();
          this.toast.error(error.error.message, errorToastStyle());
        },
      });
    }
  }
}
