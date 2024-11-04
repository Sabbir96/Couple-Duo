import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ExternalSendMoneyAmountComponent } from './pages/external-send-money-amount/external-send-money-amount.component';
import { ExternalSendMoneyEmailComponent } from './pages/external-send-money-email/external-send-money-email.component';
import { SendMoneyAmountComponent } from './pages/send-money-amount/send-money-amount.component';
import { SendMoneyEmailComponent } from './pages/send-money-email/send-money-email.component';
import { SendMoneySelectComponent } from './pages/send-money-select/send-money-select.component';
import { SendMoneyRoutingModule } from './send-money-routing.module';

@NgModule({
  declarations: [
    SendMoneyEmailComponent,
    SendMoneyAmountComponent,
    SendMoneySelectComponent,
    ExternalSendMoneyEmailComponent,
    ExternalSendMoneyAmountComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SendMoneyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SendMoneyEmailComponent,
    SendMoneyAmountComponent,
    SendMoneySelectComponent,
    ExternalSendMoneyEmailComponent,
    ExternalSendMoneyAmountComponent,
  ],
})
export class SendMoneyModule {}
