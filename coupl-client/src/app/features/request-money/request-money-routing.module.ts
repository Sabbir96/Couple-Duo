import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestMoneyEmailComponent } from './pages/request-money-email/request-money-email.component';
import { RequestMoneyAmountComponent } from './pages/request-money-amount/request-money-amount.component';

const routes: Routes = [
  {
    path: 'request-money',
    component: RequestMoneyEmailComponent,
  },
  {
    path: 'request-money/:email',
    component: RequestMoneyAmountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestMoneyRoutingModule {}
