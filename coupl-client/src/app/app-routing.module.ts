import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './features/splash-screen/splash-screen.component';
import { SigninComponent } from './features/signin/signin.component';
import { AccessComponent } from './features/access/access.component';
import { InviteComponent } from './features/invite/invite.component';
import { ProfileComponent } from './features/profile/profile.component';
import { InvitepartnerComponent } from './features/invitepartner/invitepartner.component';

const routes: Routes = [
  {
    path: '',
    component: SplashScreenComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'access',
    component: AccessComponent,
  },
  {
    path: 'invite',
    component: InviteComponent,
  },
  {
    path: 'invitepartner',
    component: InvitepartnerComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
