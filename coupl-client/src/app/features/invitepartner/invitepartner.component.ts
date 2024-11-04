import { Component, OnInit } from '@angular/core';
import {
  errorToastStyle,
  successToastStyle,
} from '../../shared/helper/toasterFunctions';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SignupService } from '../signup/services/signup.service';
import { Router } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-invitepartner',
  standalone: true,
  imports: [
    NgxSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './invitepartner.component.html',
  styleUrl: './invitepartner.component.scss',
})
export class InvitepartnerComponent implements OnInit {
  constructor(
    private router: Router,
    private signUpService: SignupService,
    private spinner: NgxSpinnerService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    // get previous url
  }

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
