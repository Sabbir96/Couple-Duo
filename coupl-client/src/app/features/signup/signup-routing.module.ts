import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './pages/address/address.component';
import { DobComponent } from './pages/dob/dob.component';
import { EmailComponent } from './pages/email/email.component';
import { NameComponent } from './pages/name/name.component';
import { OtpComponent } from './pages/otp/otp.component';
import { PasscodeComponent } from './pages/passcode/passcode.component';
import { VerifyCountryComponent } from './pages/verify-country/verify-country.component';
import { CameraComponent } from './pages/camera/camera.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { InviteComponent } from './pages/invite/invite.component';
import { DocumentUploadComponent } from './pages/document-upload/document-upload.component';
import { DocumentUploadFrontpageComponent } from './pages/document-upload-frontpage/document-upload-frontpage.component';
import { DocumentUploadBackpageComponent } from './pages/document-upload-backpage/document-upload-backpage.component';
import { PhoneNumberComponent } from './pages/phone-number/phone-number.component';

const routes: Routes = [
  {
    path: 'signup',
    // component: SignupPageComponent,
    children: [
      {
        path: 'name',
        component: NameComponent,
      },
      {
        path: 'address',
        component: AddressComponent,
      },
      {
        path: 'email',
        component: EmailComponent,
      },
      {
        path: 'otp',
        component: OtpComponent,
      },
      {
        path: 'dob',
        component: DobComponent,
      },
      {
        path: 'passcode',
        component: PasscodeComponent,
      },
      {
        path: 'country',
        component: VerifyCountryComponent,
      },
      {
        path: 'camera',
        component: CameraComponent,
      },
      {
        path: 'notification',
        component: NotificationComponent,
      },
      {
        path: 'invite',
        component: InviteComponent,
      },
      {
        path: 'document',
        component: DocumentUploadComponent,
      },
      {
        path: 'document-front-page',
        component: DocumentUploadFrontpageComponent,
      },
      {
        path: 'document-back-page',
        component: DocumentUploadBackpageComponent,
      },
      {
        path: 'phone',
        component: PhoneNumberComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
