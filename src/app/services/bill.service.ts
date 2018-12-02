import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Bill} from "../entities/bill";
import {Reservation} from "../entities/reservation";
import {BillDetailComponent} from '../pages/bill-pages/bill-detail/bill-detail.component';
import {BillDetail} from '../entities/bill-detail';
import {Reminder} from '../entities/reminder';
import {environment} from '../../environments/environment';

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

  addBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.billBaseURL, bill, this.httpOptions);
  }

  getBillsByKeyword(keyword: string): Observable<Bill[]>{
    return this.http.get<Bill[]>(this.billBaseURL+'suche/'+keyword);
  }

  getBillById(id: number): Observable<BillDetail> {
    return this.http.get<BillDetail>(this.billBaseURL + id);
  }

  sendReminder(id: number): Observable<Reminder> {
    return this.http.post<Reminder>(this.billBaseURL + id + '/mahnung', this.httpOptions);
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
