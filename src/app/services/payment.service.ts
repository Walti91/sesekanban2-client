import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../entities/customer';
import {Payment} from '../entities/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private customerBaseURL = 'http://localhost:8080/rechnung/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  sendPaymentMail(paymentId: number): Observable<Payment> {
    return this.http.get<Payment>(this.customerBaseURL + '/zahlung/' + paymentId + '/mail');
  }
}
