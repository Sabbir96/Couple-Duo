import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMoneyRoutingModule } from './add-money-routing.module';
import { AddMoneyComponent } from './pages/add-money/add-money.component';
import { BankToDuoComponent } from './pages/bank-to-duo/bank-to-duo.component';
import { CardToDuoFormComponent } from './pages/card-to-duo-form/card-to-duo-form.component';
import { CardToDuoComponent } from './pages/card-to-duo/card-to-duo.component';
import { AddMoneyService } from './services/add-money.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AddMoneyComponent,
    CardToDuoComponent,
    BankToDuoComponent,
    CardToDuoFormComponent,
  ],
  imports: [
    CommonModule,
    AddMoneyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  providers: [AddMoneyService],
  exports: [CardToDuoComponent, BankToDuoComponent, CardToDuoFormComponent],
})
export class AddMoneyModule {}
