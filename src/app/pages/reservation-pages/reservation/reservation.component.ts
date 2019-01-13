import {Component, OnInit, ViewChild} from '@angular/core';
import {MatIconRegistry, MatSort, MatTableDataSource} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Reservation} from '../../../entities/reservation';
import {ReservationService} from '../../../services/reservation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  allReservations = new MatTableDataSource([] as Reservation[]);
  displayedColumns: String[] = ['Id', 'startDate', 'End Datum', 'Kunde', 'Zimmer'];

  constructor(private reservationService: ReservationService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
              private router: Router) {
    iconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-add-24px.svg'));
  }

  onSearchChange(searchValue: string ) {

    if (searchValue != null) {
      this.reservationService.getReservationsByKeyword(searchValue).subscribe(reservations => {
        this.allReservations.sort = this.sort;
        this.allReservations.data = reservations;
      });
    }

  }

  getStartDate (startDate: string): String {
    const myDate = new Date(startDate);
    return myDate.toLocaleDateString('de');
  }

  getEndDate (endeDate: string): String {
    const myDate = new Date(endeDate);
    return myDate.toLocaleDateString('de');
  }

  searchForReservation(search: string) {

  }

  ngOnInit() {
    this.reservationService.getAllReservations().subscribe(reservations => {
      this.allReservations.sort = this.sort;
      this.allReservations.data = reservations;
    });
  }

  openDetailForReservation(row: Reservation) {
    console.log(row.id);

    this.router.navigate(['reservations', 'detail', row.id], {skipLocationChange: false});
  }
}
