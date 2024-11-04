import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiesService } from './services/cookies.service';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TopbarSmallComponent } from './components/topbar-small/topbar-small.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [TopbarComponent, TopbarSmallComponent, SpinnerComponent],
  imports: [CommonModule, NgxSpinnerModule],
  providers: [CookiesService],
  exports: [TopbarComponent, TopbarSmallComponent, SpinnerComponent],
})
export class SharedModule {}
