import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Bill} from "../entities/bill";
import {BillDetail} from '../entities/bill-detail';
import {Reminder} from '../entities/reminder';
import {environment} from '../../environments/environment';
import {BillPdf} from '../entities/bill-pdf';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private billBaseURL = environment.serverUrl + 'rechnung/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.billBaseURL);
  }

  getOverdueBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.billBaseURL + '/overdue');
  }

  addBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.billBaseURL, bill, this.httpOptions);
  }

  getBillsByKeyword(keyword: string): Observable<Bill[]>{
    return this.http.get<Bill[]>(this.billBaseURL+'suche/'+keyword);
  }

  getBillById(id: number): Observable<BillDetail> {
    return this.http.get<BillDetail>(this.billBaseURL + id);
  }

  getBillPdfById(id: number): Observable<BillPdf> {
    return this.http.get<BillPdf>(this.billBaseURL + id + '/pdf');
  }

  sendReminder(id: number): Observable<Reminder> {
    return this.http.post<Reminder>(this.billBaseURL + id + '/mahnung', this.httpOptions);
  }

  cancelBill(id: number): Observable<BillDetail> {
    return this.http.put<BillDetail>(this.billBaseURL + id + '/storno', this.httpOptions);
  }

  updateBillDiscount(id: number,discount: number): Observable<BillDetail> {
    return this.http.put<BillDetail>(this.billBaseURL + id + '/rabatt/'+discount, this.httpOptions);
  }

  extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
