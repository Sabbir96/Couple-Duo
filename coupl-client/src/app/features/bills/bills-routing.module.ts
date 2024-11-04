import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectricityFormComponent } from './electricity/pages/electricity-form/electricity-form.component';
import { ElectricityAmountComponent } from './electricity/pages/electricity-amount/electricity-amount.component';
import { GasFormComponent } from './gas/pages/gas-form/gas-form.component';
import { GasAmountComponent } from './gas/pages/gas-amount/gas-amount.component';
import { WaterFormComponent } from './water/pages/water-form/water-form.component';
import { WaterAmountComponent } from './water/pages/water-amount/water-amount.component';
import { WasteAmountComponent } from './waste/pages/waste-amount/waste-amount.component';
import { WasteFormComponent } from './waste/pages/waste-form/waste-form.component';

const routes: Routes = [
  {
    path: 'bills',
    children: [
      {
        path: 'electricity',
        children: [
          {
            path: 'form',
            component: ElectricityFormComponent,
          },
          {
            path: 'amount',
            component: ElectricityAmountComponent,
          },
        ],
      },
      {
        path: 'gas',
        children: [
          {
            path: 'form',
            component: GasFormComponent,
          },
          {
            path: 'amount',
            component: GasAmountComponent,
          },
        ],
      },
      {
        path: 'water',
        children: [
          {
            path: 'form',
            component: WaterFormComponent,
          },
          {
            path: 'amount',
            component: WaterAmountComponent,
          },
        ],
      },
      {
        path: 'waste',
        children: [
          {
            path: 'form',
            component: WasteFormComponent,
          },
          {
            path: 'amount',
            component: WasteAmountComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsRoutingModule {}
