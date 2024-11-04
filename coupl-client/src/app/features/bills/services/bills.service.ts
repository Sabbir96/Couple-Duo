import { PayGasBillDto, PayWaterBillDto, payBillDto } from './../models/bills.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookiesService } from '../../../shared/services/cookies.service';
import { Observable } from 'rxjs';
import {
  BillData,
  BillFlow,
  BillType,
  MerchantBillData,
  MerchantCategory,
  MerchantName,
  PayElectricityBillDto,
  PayTelecommunicationsBillDto,
} from '../models/bills.model';
import { getBaseUrl } from '../../../shared/constants/serverapis';

@Injectable({
  providedIn: 'root',
})
export class BillsService {
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

  payElectricityBill(payElectricityBillDto: PayElectricityBillDto) {
    const { meterNumber, contactNumber, billingMonth, amount } =
      payElectricityBillDto;
    const data: MerchantBillData = {
      amount,
      flow: BillFlow.OUT,
      category: MerchantCategory.UTILITIES,
      header: MerchantName.ELECTRICITY,
      receiver: {
        meterNumber,
        contactNumber,
        billingMonth,
      },
    };

    return this.http.post(`${this.baseUrl}/transactions/book`, data, {
      headers: this.headers,
    });
  }

  payGasBill(payGasBillDto: PayGasBillDto): Observable<any> {
    const { customerId, contactNumber, billingMonth, amount } = payGasBillDto;
    const data: MerchantBillData = {
      amount,
      flow: BillFlow.OUT,
      category: MerchantCategory.UTILITIES,
      header: MerchantName.ELECTRICITY,
      receiver: {
        customerId,
        contactNumber,
        billingMonth,
      },
    };

    return this.http.post(`${this.baseUrl}/transactions/book`, data, {
      headers: this.headers,
    });
  }

  payWasteBill(payWasteBillDto: PayWaterBillDto): Observable<any> {
   
    const { customerId, contactNumber, billingMonth, amount } = payWasteBillDto;
    const data: MerchantBillData = {
      amount,
      flow: BillFlow.OUT,
      category: MerchantCategory.UTILITIES,
      header: MerchantName.ELECTRICITY,
      receiver: {
        customerId,
        contactNumber,
        billingMonth,
      },
    };

    return this.http.post(`${this.baseUrl}/transactions/book`, data, {
      headers: this.headers,
    });

  }

  payTelecommunicationsBill(
    payTelecommunicationsBillDto: PayTelecommunicationsBillDto
  ): Observable<any> {
    const { amount, operator } = payTelecommunicationsBillDto;
    const data: MerchantBillData = {
      amount,
      flow: BillFlow.OUT,
      category: MerchantCategory.TELECOMMUNICATIONS,
      header: operator,
      receiver: payTelecommunicationsBillDto,
    };

    return this.http.post(`${this.baseUrl}/transactions/book`, data, {
      headers: this.headers,
    });
  }
}
