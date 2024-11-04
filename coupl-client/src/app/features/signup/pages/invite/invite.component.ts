import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngneat/hot-toast';
import {
  errorToastStyle,
  successToastStyle,
} from '../../../../shared/helper/toasterFunctions';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.scss',
})
export class InviteComponent {
  constructor(
    private router: Router,
    private signUpService: SignupService,
    private spinner: NgxSpinnerService,
    private toast: HotToastService
  ) {}

  displayInvitePartnerView = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  showInvitationField() {
    // all the logic to invite partner
    this.displayInvitePartnerView = !this.displayInvitePartnerView;
  }

  sendInvitation() {
    this.spinner.show();
    this.signUpService.sendInvitation(this.email.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          // check if response has a success property
          this.router.navigate(['/home']);
        } else {
          console.error('Invitation sending failed:', res);
        }
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.toast.error('Invitation sending failed', errorToastStyle());
      },
      complete: () => {
        this.spinner.hide();
        this.toast.success('Invitation sent successfully', successToastStyle());
      },
    });
  }

  skipInvite() {
    // all the logic to skip invite partner
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
