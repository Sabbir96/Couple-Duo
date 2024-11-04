import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendMoneyEmailComponent } from './pages/send-money-email/send-money-email.component';
import { SendMoneyAmountComponent } from './pages/send-money-amount/send-money-amount.component';
import { SendMoneySelectComponent } from './pages/send-money-select/send-money-select.component';
import { ExternalSendMoneyEmailComponent } from './pages/external-send-money-email/external-send-money-email.component';
import { ExternalSendMoneyAmountComponent } from './pages/external-send-money-amount/external-send-money-amount.component';

const routes: Routes = [
  {
    path: 'send-money',
    component: SendMoneySelectComponent,
  },
  {
    path: 'send-money-external-email',
    component: ExternalSendMoneyEmailComponent,
  },
  {
    path: 'send-money-external-amount',
    component: ExternalSendMoneyAmountComponent,
  },
  {
    path: 'send-money-email',
    component: SendMoneyEmailComponent,
  },
  {
    path: 'send-money-amount',
    component: SendMoneyAmountComponent,
    data: { title: 'Send Money' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendMoneyRoutingModule {}
