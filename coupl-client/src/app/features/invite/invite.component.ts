import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { InviteService } from './invite.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngneat/hot-toast';
import {
  errorToastStyle,
  successToastStyle,
} from '../../shared/helper/toasterFunctions';

@Component({
  selector: 'app-invite',
  standalone: true,
  imports: [NgxSpinnerModule],
  providers: [InviteService],
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.scss',
})
export class InviteComponent implements OnInit {
  constructor(
    private inviteService: InviteService,
    private router: Router,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService,
    private toast: HotToastService
  ) {}

  isPairUpSuccessful: boolean | null = false;
  partnerEmail: string = '';

  ngOnInit(): void {
    this.spinner.show();

    // extract invitation token from url
    const url = window.location.href;
    const invitationToken = url.split('=')[1];

    if (invitationToken) {
      this.cookieService.set('invitationToken', invitationToken);

      if (this.inviteService.isLoggedIn()) {
        this.verifyAndPairUp(invitationToken);
      } else {
        this.spinner.hide();
        this.router.navigate(['/access']);
      }
    } else {
      if (this.inviteService.isLoggedIn()) {
        // this.router.navigate(['/home']);
      } else {
        this.spinner.hide();
        this.router.navigate(['/access']);
      }
    }
  }

  verifyAndPairUp(invitationToken: string): void {
    const partnerEmail = this.cookieService.get('email_address');

    if (partnerEmail) {
      this.inviteService
        .verifyInvitationToken(invitationToken, partnerEmail)
        .subscribe({
          next: (res) => {
            console.log('verifyToken', res);
            // send request to pair-up with primaryId
            this.inviteService.pairUpWithPrimaryId(res.inviterId).subscribe({
              next: (res) => {
                this.spinner.hide();
                this.toast.success('Paired successfully', successToastStyle());
              },
              error: (err) => {
                this.spinner.hide();
                this.toast.error(
                  ` ${err.status}: ${
                    err.error.error || 'Something went wrong'
                  } `,
                  errorToastStyle()
                );
              },
              complete: () => {
                setTimeout(() => {
                  this.router.navigate(['/home']);
                }, 3000);
              },
            });

            this.toast.success(
              'Invitation token verified successfully',
              successToastStyle()
            );
          },
          error: (err) => {
            this.spinner.hide();
            this.toast.error(
              ` ${err.status}: ${err.error.error || 'Something went wrong'} `,
              errorToastStyle()
            );
          },
        });
    }
  }
}
