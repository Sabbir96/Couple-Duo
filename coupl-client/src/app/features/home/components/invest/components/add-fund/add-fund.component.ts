import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../../../services/home.service';
import { CookiesService } from '../../../../../../shared/services/cookies.service';
import {
  errorToastStyle,
  successToastStyle,
} from '../../../../../../shared/helper/toasterFunctions';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.scss'],
})
export class AddFundComponent {
  amount!: number;

  constructor(
    private router: Router,
    private homeService: HomeService,
    private cookiesService: CookiesService,
    private toast: HotToastService
  ) {}

  async addFund() {
    const accountId = this.cookiesService.getAccountId();
    const relationId = this.cookiesService.getRelationId();
    const data = {
      accountId,
      relationId,
      amount: this.amount,
    };
    console.log('Adding fund with data:', data);
    this.homeService.addFundToAccount(data).subscribe({
      next: (response) => {
        console.log('Add fund response:', response);
        this.makeTransaction();
      },
      error: (error) => {
        console.error('Add fund error:', error);
      },
      complete: () => {
        this.router.navigate(['/home/invest']);
        console.log('Add fund completed');
      },
    });
  }

  private makeTransaction() {
    const transactionData = {
      amount: this.amount,
      flow: 'OUT',
      category: 'investment',
    };
    this.homeService.makeTransaction(transactionData).subscribe({
      next: (transactionResponse) => {
        console.log('Transaction response:', transactionResponse);
      },
      error: (transactionError) => {
        console.error('Transaction error:', transactionError);
      },
    });
  }
}
