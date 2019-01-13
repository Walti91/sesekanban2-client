import { Component, OnInit } from '@angular/core';
import {ReservationService} from '../../../services/reservation.service';
import {Reservation} from '../../../entities/reservation';

@Component({
  selector: 'app-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.scss']
})
export class RoomDashboardComponent implements OnInit {

  constructor(private reservationService: ReservationService) { }

  startingReservations: Reservation[];
  endingReservations: Reservation[];

  displayedColumns: String[] = ['Zimmer', 'Anzahl Erwachsene', 'Anzahl Kinder'];

  ngOnInit() {
    this.reservationService.getTodaysStartingReservation().subscribe(reservations => {
      this.startingReservations = reservations;
    });
    this.reservationService.getTodaysEndingReservation().subscribe(reservations => {
      this.endingReservations = reservations;
    });
  }

}
