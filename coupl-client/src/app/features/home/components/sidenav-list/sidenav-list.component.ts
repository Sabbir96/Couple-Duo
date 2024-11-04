import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../../sidenav.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  alpacaAccountId!: string;

  constructor(
    private sidenavService: SidenavService,
    private homeService: HomeService
  ) {}

  async ngOnInit() {
    const profile: any = await this.homeService.getProfile().toPromise();
    this.alpacaAccountId = profile.alpaca_account_id;
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
