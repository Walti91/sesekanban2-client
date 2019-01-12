import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../entities/bill';
import {Log} from '../entities/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logBaseURL = environment.serverUrl + 'logs/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(this.logBaseURL);
  }
}
