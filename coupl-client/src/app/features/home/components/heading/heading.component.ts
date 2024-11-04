import { Component } from '@angular/core';
import { SidenavService } from '../../sidenav.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent {
  primaryAccountName: string = 'Ariful Islam';
  partnerAccountName: string = 'Audity';
  showSideBar: boolean = false;
  title = '';

  constructor(
    private sidenavService: SidenavService,
    public route: ActivatedRoute
  ) {}

  toggleSidenav(): void {
    this.sidenavService.toggle();
    this.showSideBar = !this.showSideBar;
  }
}
