import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AddressComponent } from './pages/address/address.component';
import { DobComponent } from './pages/dob/dob.component';
import { EmailComponent } from './pages/email/email.component';
import { NameComponent } from './pages/name/name.component';
import { OtpComponent } from './pages/otp/otp.component';
import { SignupRoutingModule } from './signup-routing.module';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { CameraComponent } from './pages/camera/camera.component';
import { PasscodeComponent } from './pages/passcode/passcode.component';
import { VerifyCountryComponent } from './pages/verify-country/verify-country.component';

import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WebcamModule } from 'ngx-webcam';
import { SharedModule } from '../../shared/shared.module';
import { DocumentUploadBackpageComponent } from './pages/document-upload-backpage/document-upload-backpage.component';
import { DocumentUploadFrontpageComponent } from './pages/document-upload-frontpage/document-upload-frontpage.component';
import { DocumentUploadComponent } from './pages/document-upload/document-upload.component';
import { InviteComponent } from './pages/invite/invite.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { PhoneNumberComponent } from './pages/phone-number/phone-number.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    NameComponent,
    AddressComponent,
    EmailComponent,
    OtpComponent,
    DobComponent,
    PasscodeComponent,
    VerifyCountryComponent,
    CameraComponent,
    NotificationComponent,
    InviteComponent,
    DocumentUploadComponent,
    DocumentUploadFrontpageComponent,
    DocumentUploadBackpageComponent,
    PhoneNumberComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDatepickerModule,
    SignupRoutingModule,
    BrowserModule,
    WebcamModule,
    MatRadioModule,
    SharedModule,
  ],
  exports: [
    EmailComponent,
    OtpComponent,
    DobComponent,
    PasscodeComponent,
    VerifyCountryComponent,
    CameraComponent,
    NotificationComponent,
    InviteComponent,
    PhoneNumberComponent,
  ],
})
export class SignupModule {}
