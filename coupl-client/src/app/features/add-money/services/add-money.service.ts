import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl } from '../../../shared/constants/serverapis';
import { CookiesService } from '../../../shared/services/cookies.service';
import { AddMoneyFlow, cardToDuoForm } from '../models/addMoney.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddMoneyService {
  baseUrl = getBaseUrl;

  constructor(
    private http: HttpClient,
    private cookiesService: CookiesService
  ) {}

  headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.cookiesService.getAccessToken()}`
  );

  addMoneyToDuo(cardToDuoForm: any): Observable<any> {
    const url = `${this.baseUrl}/transactions/book`;

    return this.http.post(
      url,
      {
        amount: Number(cardToDuoForm.amount),
        flow: AddMoneyFlow.IN,
        header: `**** **** **** ${cardToDuoForm.cardNumber
          .toString()
          .slice(-4)}`,
        category: 'Deposit',
        sender: cardToDuoForm,
      },
      {
        headers: this.headers,
      }
    );
  }
}
