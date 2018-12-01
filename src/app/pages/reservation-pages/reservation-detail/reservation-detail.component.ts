import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReservationService} from '../../../services/reservation.service';
import {Comment} from '../../../entities/comment';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Reservation} from '../../../entities/reservation';
import {Room} from '../../../entities/room';
import {RoomService} from '../../../services/room.service';
import {RoomReservation} from '../../../entities/room-reservation';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit, OnDestroy {

  private comment = new FormControl('', [Validators.required]);
  private FETCHEDCOMMENTS: Comment[];
  private reservation: Reservation;
  private reservationId: number;
  private sub: Subscription;

  displayedColumns: String[] = ['Id', 'Name', 'Kapazität', 'Kapazität Erwachsene', 'Preis Erwachsene', 'Preis Kinder', 'Erwachsene', 'Kinder'];

  commentForm: FormGroup = new FormGroup({
    comment: this.comment
  });

  constructor(private reservationService: ReservationService, private route: ActivatedRoute, private roomService: RoomService) {

  }

  getStartDate (startDate: string): String {
    const myDate = new Date(startDate);
    return myDate.toLocaleDateString('de');
  }

  getEndDate (endeDate: string): String {
    const myDate = new Date(endeDate);
    return myDate.toLocaleDateString('de');
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.reservationId = +params['id'];
      this.fetchReservation(this.reservationId);
      this.fetchAllComments();
    });
  }

  fetchReservation(id: number) {
    this.reservationService.getReservationById(this.reservationId).subscribe(reservation => this.reservation = reservation);
  }

  fetchAllComments() {
    this.reservationService.getAllCommentsFromReservation(this.reservationId)
      .subscribe(comments => this.FETCHEDCOMMENTS = comments.reverse());
  }

  onSubmit() {
    const commentToSave: Comment = new Comment();
    commentToSave.text = this.comment.value;

    const result: Observable<Comment> = this.reservationService.saveCommentForReservation(this.reservationId, commentToSave);

    result.subscribe(value => value);

    this.fetchAllComments();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
