import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HomeService } from '../../../../services/home.service';

interface AccountResponse {
  id: string;
}

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent {
  constructor(private router: Router, private homeService: HomeService) {}

  async portfolio() {
    try {
      const profile = await this.getProfile();
      const accountResponse: AccountResponse = await this.createClientAccount(
        profile
      );
      const achRelationData = this.prepareAchRelationData(accountResponse.id);
      const alpacaRelationId = await this.createAchRelation(achRelationData);
      await this.updateProfile(accountResponse.id, alpacaRelationId);
      this.navigateToInvestPage();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  private async getProfile() {
    const response: any = await firstValueFrom(this.homeService.getProfile());
    const {
      first_name,
      last_name,
      email_address,
      phone_number,
      date_of_birth,
      physical_address,
    } = response;
    return {
      first_name,
      last_name,
      email_address,
      phone_number,
      date_of_birth,
      physical_address,
    };
  }

  private async createClientAccount(profile: any): Promise<any> {
    return await firstValueFrom(this.homeService.createClientAccount(profile));
  }

  private prepareAchRelationData(accountId: string) {
    return {
      accountId,
      bankAccountData: {},
    };
  }

  private async createAchRelation(achRelationData: any) {
    const response: any = await firstValueFrom(
      this.homeService.createAchRelation(achRelationData)
    );
    return response.id;
  }

  private async updateProfile(accountId: string, alpacaRelationId: string) {
    return await firstValueFrom(
      this.homeService.updateProfile({
        alpaca_account_id: accountId,
        alpaca_relation_id: alpacaRelationId,
      })
    );
  }

  private navigateToInvestPage() {
    this.router.navigate(['/home/invest']);
  }
}
