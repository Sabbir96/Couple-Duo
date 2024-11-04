import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home/home.module';
import { SignupModule } from './features/signup/signup.module';
import { SplashScreenComponent } from './features/splash-screen/splash-screen.component';
import { NgChartsModule } from 'ng2-charts';
import { AddMoneyModule } from './features/add-money/add-money.module';
import { TopupModule } from './features/topup/topup.module';
import { BillsModule } from './features/bills/bills.module';
import { SendMoneyModule } from './features/send-money/send-money.module';
import { RequestMoneyModule } from './features/request-money/request-money.module';

@NgModule({
  declarations: [AppComponent, SplashScreenComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SignupModule,
    HomeModule,
    AddMoneyModule,
    TopupModule,
    BillsModule,
    SendMoneyModule,
    RequestMoneyModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgChartsModule,
  ],
  providers: [provideHotToastConfig()],
  bootstrap: [AppComponent],
})
export class AppModule {}
