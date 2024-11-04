import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl } from '../../../shared/constants/serverapis';
import { CookiesService } from '../../../shared/services/cookies.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private headers: HttpHeaders;
  private baseUrl = getBaseUrl;

  constructor(
    private http: HttpClient,
    private cookiesService: CookiesService
  ) {
    const accessToken = this.cookiesService.getAccessToken();
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
  }

  updateProfile(data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/profile`, data, {
      headers: this.headers,
    });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`, { headers: this.headers });
  }

  createClientAccount(data: any) {
    return this.http.post(`${this.baseUrl}/investments/accounts`, data, {
      headers: this.headers,
    });
  }

  createAchRelation(data: any) {
    return this.http.post(
      `${this.baseUrl}/investments/ach-relationships`,
      data,
      { headers: this.headers }
    );
  }

  addFundToAccount(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/investments/addFunds`, data, {
      headers: this.headers,
    });
  }

  makeTransaction(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/transactions/book`, data, {
      headers: this.headers,
    });
  }

  getTradingAccById(id: string) {
    return this.http.get(`${this.baseUrl}/investments/trading-data/${id}`, {
      headers: this.headers,
    });
  }

  getBalance(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bank-account/balance`, {
      headers: this.headers,
    });
  }
}
