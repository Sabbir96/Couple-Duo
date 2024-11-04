import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl } from '../../shared/constants/serverapis';
import { CookieService } from 'ngx-cookie-service';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  baseUrl = getBaseUrl;

  signIn(
    email_address: string | null,
    passcode: number | null
  ): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/auth/signin`, {
        email_address: email_address,
        pin: passcode,
      })
      .pipe(
        tap((res) => console.log(res)) // Log the response
      );
  }
}
