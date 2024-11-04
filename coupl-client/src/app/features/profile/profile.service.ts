import { Injectable } from '@angular/core';
import { CookiesService } from '../../shared/services/cookies.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getBaseUrl } from '../../shared/constants/serverapis';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl = getBaseUrl;
  constructor(
    private cookiesService: CookiesService,
    private router: Router,
    private http: HttpClient
  ) {}

  accessToken = this.cookiesService.getAccessToken();

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
