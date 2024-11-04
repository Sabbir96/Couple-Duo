import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  constructor(private signUpService: SignupService, private router: Router) {}
  ClickOnEnableNotification() {
    console.log('Enable Notification');
    // ask for notification permission
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else {
      Notification.requestPermission().then((permission) => {
        console.log('Permission:', permission);
      });
    }
    this.router.navigate(['/signup/phone']);
  }

  ClickOnDisableNotification() {
    console.log('Disable Notification');
  }
}
