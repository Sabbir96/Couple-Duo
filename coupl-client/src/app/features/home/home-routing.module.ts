import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddFundComponent } from './components/invest/components/add-fund/add-fund.component';
import { ConnectComponent } from './components/invest/components/connect/connect.component';
import { InvestPageComponent } from './components/invest/pages/invest-page/invest-page.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PortfolioComponent } from './components/invest/components/portfolio/portfolio.component';
import { ExploreComponent } from './components/invest/components/explore/explore.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { title: 'home' },
      },
      {
        path: 'tracking',
        component: TrackingComponent,
        data: { title: 'tracking' },
      },
      {
        path: 'invest',
        component: InvestPageComponent,
        data: { title: 'invest' },
        children: [
          {
            path: '',
            component: PortfolioComponent,
            data: { title: 'portfolio' },
          },
          {
            path: 'connect',
            component: ConnectComponent,
            data: { title: 'connect' },
          },
          {
            path: 'add-fund',
            component: AddFundComponent,
            data: { title: 'addFund' },
          },
          {
            path: 'explore',
            component: ExploreComponent,
            data: { title: 'explore' },
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
export class HomeRoutingModule {}
