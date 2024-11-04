import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { FormControl, Validators } from '@angular/forms';
import { CookiesService } from '../../../../shared/services/cookies.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngneat/hot-toast';
import {
  errorToastStyle,
  successToastStyle,
} from '../../../../shared/helper/toasterFunctions';

@Component({
  selector: 'app-passcode',
  templateUrl: './passcode.component.html',
  styleUrl: './passcode.component.scss',
})
export class PasscodeComponent {
  constructor(
    private signUpService: SignupService,
    private router: Router,
    private cookiesService: CookiesService,
    private spinner: NgxSpinnerService,
    private toast: HotToastService
  ) {}

  // passcode must 6 digits long and only contain numbers

  passcode = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.minLength(6),
    Validators.maxLength(6),
  ]);

  createAccount() {
    this.spinner.show();
    this.signUpService.saveToLocalStorage('pin', this.passcode.value);
    this.checkInviteToken();
  }

  checkInviteToken() {
    this.spinner.show();

    const inviteToken = this.cookiesService.getInvitationTokenFromCookies();

    if (inviteToken) {
      this.signUpService.createUser().subscribe({
        next: (res) => {
          console.log(res);
          if (res.access_token) {
            this.cookiesService.saveAccessToken(
              res.access_token,
              res.expires_in
            );
            const email_address =
              this.cookiesService.getEmailAddressFromLocalStorage();
            this.cookiesService.saveToCookies(
              'email_address',
              email_address,
              res.expires_in
            );
          }
          this.spinner.hide();
          this.toast.success(
            'Account created successfully',
            successToastStyle()
          );

          // navigate to invite page with invite token
          this.router.navigate(['invite'], {
            queryParams: { invitationToken: inviteToken },
          });
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this.signUpService.createUser().subscribe({
        next: (res) => {
          if (res.access_token) {
            this.cookiesService.saveAccessToken(
              res.access_token,
              res.expires_in
            );
            const email_address =
              this.cookiesService.getEmailAddressFromLocalStorage();
            this.cookiesService.saveToCookies(
              'email_address',
              email_address,
              res.expires_in
            );
          }
          this.spinner.hide();
          this.toast.success(
            'Account created successfully',
            successToastStyle()
          );
          console.log(res);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.spinner.hide();
          this.toast.error(err.error.message, errorToastStyle());
          console.error(err);
        },
      });
    }
  }
}
