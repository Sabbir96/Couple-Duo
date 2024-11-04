import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopupRoutingModule } from './topup-routing.module';
import { TopupComponent } from './pages/topup/topup.component';
import { TopupNumberComponent } from './pages/topup-number/topup-number.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopupAmountComponent } from './pages/topup-amount/topup-amount.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [TopupComponent, TopupNumberComponent, TopupAmountComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TopupRoutingModule,
  ],
  exports: [TopupComponent, TopupNumberComponent, TopupAmountComponent],
})
export class TopupModule {}
