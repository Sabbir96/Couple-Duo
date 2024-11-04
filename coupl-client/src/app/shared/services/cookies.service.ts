import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor(private cookieService: CookieService) {}

  // save access token in cookies
  saveAccessToken(access_token: string, expires_in: number) {
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + expires_in);
    this.cookieService.set('access_token', access_token, expirationDate);
  }

  saveToCookies(key: string, value: string, expires_in: number): void {
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + expires_in);
    this.cookieService.set(key, value, expirationDate);
  }

  updateCookies(key: string, value: string, expires_in: number): void {
    if (this.cookieService.check(key)) {
      const expirationDate = new Date();
      expirationDate.setSeconds(expirationDate.getSeconds() + expires_in);
      this.cookieService.set(key, value, expirationDate);
    }
  }

  // get access token from cookies
  getAccessToken() {
    return this.cookieService.get('access_token');
  }

  // get access token from cookies
  getAccountId() {
    return this.cookieService.get('accountId');
  }

  // get access token from cookies
  getRelationId() {
    return this.cookieService.get('relationId');
  }

  // delete access token from cookies
  deleteAccessToken() {
    this.cookieService.delete('access_token');
  }

  getEmailAddressFromLocalStorage() {
    const userObject: string | null = localStorage.getItem('userObject');
    if (!userObject) {
      return;
    }
    const parsedUserObject = JSON.parse(userObject);
    return parsedUserObject.email_address;
  }

  getInvitationTokenFromCookies() {
    return this.cookieService.get('invitationToken');
  }
}