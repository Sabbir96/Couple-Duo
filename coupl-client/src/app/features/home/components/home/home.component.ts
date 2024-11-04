import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  primaryAccountName: string = 'Ariful Islam';
  partnerAccountName: string = 'Audity';
  api: boolean = true;

  constructor(private homeService: HomeService) {}

  isPaired = false;

  profile: any;
  balance: string = '0.00';

  ngOnInit(): void {
    this.getUserProfile();
    this.getUserBalance();
  }

  getUserProfile() {
    this.homeService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        const name = data?.first_name;
        console.log(name);
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUserBalance() {
    this.homeService.getBalance().subscribe({
      next: (res) => {
        this.balance = res?.balance;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
