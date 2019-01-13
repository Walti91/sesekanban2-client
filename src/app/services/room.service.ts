import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../entities/room';
import {environment} from '../../environments/environment';
import {RoomFree} from '../entities/room-free';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomBaseURL = environment.serverUrl + 'zimmer/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomBaseURL);
  }

  getFreeRooms(startDate: Date, endDate: Date): Observable<Room[]> {
    return this.http.post<Room[]>(this.roomBaseURL + 'free', { startDate, endDate });
  }

  isRoomFree(roomId: number, startDate: Date, endDate: Date): Observable<RoomFree> {
    return this.http.post<RoomFree>(this.roomBaseURL + 'free/' + roomId, { startDate, endDate });
  }

  getRoomByReservationId(reservationId: number): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomBaseURL+"reservation/"+reservationId);
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
