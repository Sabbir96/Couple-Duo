import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { getBaseUrl } from '../../shared/constants/serverapis';
import { CookiesService } from '../../shared/services/cookies.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private cookiesService: CookiesService
  ) {}

  baseUrl = getBaseUrl;

  // check if user is logged in
  isLoggedIn() {
    const token = this.cookieService.get('access_token');

    if (token) {
      return true;
    } else {
      return false;
    }
  }

  verifyInvitationToken(
    invitationToken: string,
    partnerEmail: string
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/invitation/verify-invitation`, {
      invitationToken,
      partnerEmail,
    });
  }

  // send request to pair-up with primaryId
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

  getProfile() {
    // get accessToken from cookies
    const access_token = this.cookiesService.getAccessToken();
    // create headers
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${access_token}`
    );

    return this.http.get(`${this.baseUrl}/profile`, { headers });
  }
}
