import { SendMoneyOutsideDto } from './../../models/sendmoney.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookiesService } from '../../../../shared/services/cookies.service';
import { getBaseUrl } from '../../../../shared/constants/serverapis';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendMoneyService {
  baseUrl = getBaseUrl;

  constructor(
    private http: HttpClient,
    private cookiesService: CookiesService
  ) {}

  headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.cookiesService.getAccessToken()}`
  );

  sendMoneyInside(data: any): Observable<any> {
    const url = `${this.baseUrl}/transactions/book`;

    return this.http.post(
      url,
      {
        amount: Number(data.amount),
        flow: 'OUT',
        category: 'Sent Money',
        type: 'internal',
        header: data.receiver,
        receiver: data.receiver,
      },
      {
        headers: this.headers,
      }
    );
  }

  SendMoneyOutside(sendMoneyOutsideDto: SendMoneyOutsideDto): Observable<any> {
    const url = `${this.baseUrl}/transactions/book`;

    return this.http.post(
      url,
      {
        amount: sendMoneyOutsideDto.amount,
        flow: 'OUT',
        category: 'Sent Money',
        header: sendMoneyOutsideDto.name,
        receiver: sendMoneyOutsideDto,
      },
      {
        headers: this.headers,
      }
    );
  }
}
