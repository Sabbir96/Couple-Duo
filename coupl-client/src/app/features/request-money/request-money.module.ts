import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RequestMoneyRoutingModule } from './request-money-routing.module';
import { RequestMoneyAmountComponent } from './pages/request-money-amount/request-money-amount.component';
import { RequestMoneyEmailComponent } from './pages/request-money-email/request-money-email.component';

@NgModule({
  declarations: [RequestMoneyAmountComponent, RequestMoneyEmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RequestMoneyRoutingModule,
    NgxSpinnerModule,
  ],
})
export class RequestMoneyModule {}
