import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopupComponent } from './pages/topup/topup.component';
import { TopupNumberComponent } from './pages/topup-number/topup-number.component';
import { TopupAmountComponent } from './pages/topup-amount/topup-amount.component';

const routes: Routes = [
  {
    path: 'topup',
    component: TopupComponent,
  },
  {
    path: 'topup-number',
    component: TopupNumberComponent,
  },
  {
    path: 'topup-amount',
    component: TopupAmountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupRoutingModule {}
