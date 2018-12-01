import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../entities/comment';
// import {Observable} from 'rxjs/index';
import {Reservation} from '../entities/reservation';
import {Customer} from '../entities/customer';
import {Room} from "../entities/room";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationBaseURL = 'http://localhost:8080/api/reservierung/';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }



  getAllCommentsFromReservation(reservationId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.reservationBaseURL + reservationId + '/kommentar');
  }

  saveCommentForReservation(reservationId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.reservationBaseURL + reservationId + '/kommentar', comment, this.httpOptions);
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.reservationBaseURL);
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.reservationBaseURL, reservation, this.httpOptions);
  }

  getReservationsByKeyword(keyword: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.reservationBaseURL + 'suche/' + keyword);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(this.reservationBaseURL + id);
  }

  extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
