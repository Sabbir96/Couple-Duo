import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMoneyComponent } from './pages/add-money/add-money.component';
import { CardToDuoComponent } from './pages/card-to-duo/card-to-duo.component';
import { BankToDuoComponent } from './pages/bank-to-duo/bank-to-duo.component';
import { CardToDuoFormComponent } from './pages/card-to-duo-form/card-to-duo-form.component';

const routes: Routes = [
  {
    path: 'add-money',
    component: AddMoneyComponent,
  },
  {
    path: 'cardtoduo',
    component: CardToDuoComponent,
  },
  {
    path: 'banktoduo',
    component: BankToDuoComponent,
  },
  {
    path: 'cardtoduoform',
    component: CardToDuoFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMoneyRoutingModule {}
