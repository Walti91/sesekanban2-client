import {Injectable} from '@angular/core';
import {Customer} from '../entities/customer';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerBaseURL = environment.serverUrl + 'kunde/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerBaseURL);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customerBaseURL, customer, this.httpOptions);
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
