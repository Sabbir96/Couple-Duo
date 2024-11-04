import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgChartsModule } from 'ng2-charts';
import { HeadingComponent } from './components/heading/heading.component';
import { AddFundComponent } from './components/invest/components/add-fund/add-fund.component';
import { ConnectComponent } from './components/invest/components/connect/connect.component';
import { InvestPageComponent } from './components/invest/pages/invest-page/invest-page.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { PortfolioComponent } from './components/invest/components/portfolio/portfolio.component';
import { ExploreComponent } from './components/invest/components/explore/explore.component';

@NgModule({
  declarations: [
    HomePageComponent,
    HomeComponent,
    SidenavListComponent,
    TrackingComponent,
    HeadingComponent,
    InvestPageComponent,
    ConnectComponent,
    PortfolioComponent,
    AddFundComponent,
    ExploreComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    NgChartsModule,
  ],
  exports: [HomePageComponent, HomeComponent],
})
export class HomeModule {}
