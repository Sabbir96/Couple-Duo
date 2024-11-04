import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BillsRoutingModule } from './bills-routing.module';
import { ElectricityAmountComponent } from './electricity/pages/electricity-amount/electricity-amount.component';
import { ElectricityFormComponent } from './electricity/pages/electricity-form/electricity-form.component';
import { GasFormComponent } from './gas/pages/gas-form/gas-form.component';
import { GasAmountComponent } from './gas/pages/gas-amount/gas-amount.component';
import { WaterAmountComponent } from './water/pages/water-amount/water-amount.component';
import { WaterFormComponent } from './water/pages/water-form/water-form.component';
import { WasteFormComponent } from './waste/pages/waste-form/waste-form.component';
import { WasteAmountComponent } from './waste/pages/waste-amount/waste-amount.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideHotToastConfig } from '@ngneat/hot-toast';

@NgModule({
  declarations: [
    ElectricityAmountComponent,
    ElectricityFormComponent,
    GasFormComponent,
    GasAmountComponent,
    WaterAmountComponent,
    WaterFormComponent,
    WasteFormComponent,
    WasteAmountComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BillsRoutingModule,
    NgxSpinnerModule,
  ],
  providers: [provideHotToastConfig()],
  exports: [
    ElectricityAmountComponent,
    ElectricityFormComponent,
    GasFormComponent,
    GasAmountComponent,
    WaterAmountComponent,
    WaterFormComponent,
    WasteFormComponent,
    WasteAmountComponent,
  ],
})
export class BillsModule {}
