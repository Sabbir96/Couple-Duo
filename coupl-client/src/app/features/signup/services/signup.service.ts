import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl } from '../../../shared/constants/serverapis';
import { Observable, catchError } from 'rxjs';
import { handleErrorPipe } from '../../../shared/helper/helperFunctions';
import { CookiesService } from '../../../shared/services/cookies.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(
    private http: HttpClient,
    private cookiesService: CookiesService
  ) {}

  baseUrl = getBaseUrl;

  userEmail = this.getUserNameFromLocalHost();

  checkDuplicateEmail(email: string | null) {
    return this.http.get(`${this.baseUrl}/auth/check-email?email=${email}`);
  }

  getOtp(): Observable<any> {
    console.log(this.userEmail);
    return this.http
      .post(`${this.baseUrl}/auth/send-otp`, {
        email_address: this.getUserNameFromLocalHost(),
      })
      .pipe(catchError(handleErrorPipe));
  }

  verifyOtp(otp: string | null): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/auth/verify-otp`, {
        otp,
        email_address: this.getUserNameFromLocalHost(),
      })
      .pipe(catchError(handleErrorPipe));
  }

  saveToLocalStorage(key: string, value: string | null) {
    // check if there any userObject in the local storage if not create one and if there is one then add the new key value pair to the existing one and save it to the local storage if  key value pair already exists then update the value of the key
    const userObject = JSON.parse(localStorage.getItem('userObject') || '{}');
    if (Object.keys(userObject).length === 0) {
      localStorage.setItem('userObject', JSON.stringify({ [key]: value }));
    } else {
      localStorage.setItem(
        'userObject',
        JSON.stringify({ ...userObject, [key]: value })
      );
    }
  }

  getUserNameFromLocalHost() {
    const userObject = JSON.parse(localStorage.getItem('userObject') || '{}');
    return userObject['email_address'];
  }

  getEmailFromLocalStorage() {
    const userObject = JSON.parse(localStorage.getItem('userObject') || '{}');
    return userObject['email_address'];
  }

  createUser(): Observable<any> {
    const userObject = JSON.parse(localStorage.getItem('userObject') || '{}');

    console.log(userObject);

    return this.http.post(`${this.baseUrl}/auth/signup`, {
      ...userObject,
      citizenship: 'US',
    });
  }

  sendInvitation(partnerEmail: string | null): Observable<any> {
    // get accessToken from cookies
    const access_token = this.cookiesService.getAccessToken();
    // create headers
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${access_token}`
    );

    return this.http.post(
      `${this.baseUrl}/invitation/invite-partner`,
      {
        partnerEmail,
      },
      { headers }
    );
  }

  getFromLocalStorage(key: string) {
    const userObject = JSON.parse(localStorage.getItem('userObject') || '{}');
    return userObject[key];
  }

  pairUpWithPrimaryId(primaryId: string): Observable<any> {
    // get accessToken from cookies
    const access_token = this.cookiesService.getAccessToken();
    // create headers
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${access_token}`
    );

    return this.http.post(
      `${this.baseUrl}/invitation/pair-up`,
      {
        primaryId,
      },
      { headers }
    );
  }
}
