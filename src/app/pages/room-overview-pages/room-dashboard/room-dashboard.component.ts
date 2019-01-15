import { Component, OnInit } from '@angular/core';
import {ReservationService} from '../../../services/reservation.service';
import {Reservation} from '../../../entities/reservation';
import {Bill} from '../../../entities/bill';
import {BillService} from '../../../services/bill.service';

@Component({
  selector: 'app-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.scss']
})
export class RoomDashboardComponent implements OnInit {

  constructor(private reservationService: ReservationService, private billService: BillService) { }

  startingReservations: Reservation[];
  endingReservations: Reservation[];
  overdueBills: Bill[];
  empty: boolean =false;


  displayedColumns: String[] = ['Zimmer', 'Anzahl Erwachsene', 'Anzahl Kinder'];

  ngOnInit() {
    this.reservationService.getTodaysStartingReservation().subscribe(reservations => {
      this.startingReservations = reservations;
    });
    this.reservationService.getTodaysEndingReservation().subscribe(reservations => {
      this.endingReservations = reservations;
    });
    this.billService.getOverdueBills().subscribe(bills => {
           this.overdueBills = bills;

           if (this.overdueBills.length===0)
             this.empty=true;

    });
  }

}
