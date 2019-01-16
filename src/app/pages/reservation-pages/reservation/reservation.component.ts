import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatIconRegistry, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Reservation} from '../../../entities/reservation';
import {ReservationService} from '../../../services/reservation.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {BillService} from '../../../services/bill.service';
import {Bill} from '../../../entities/bill';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  allReservations = new MatTableDataSource([] as Reservation[]);
  displayedColumns: String[] = ['Id', 'startDate', 'End Datum', 'Kunde', 'Zimmer', 'actions'];

  private clickedAction = false;

  constructor(private reservationService: ReservationService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
              private router: Router, private billService: BillService,
              public snackBar: MatSnackBar, public dialog: MatDialog) {
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
    if (!this.clickedAction) {
      console.log(row.id);
      this.router.navigate(['reservations', 'detail', row.id], {skipLocationChange: false});
    } else {
      this.clickedAction = false;
    }
  }

  createBill(row: Reservation) {
    this.clickedAction = true;

    const bill: Bill = new Bill();
    bill.reservationIds = [row.id];

    const result: Observable<Bill> = this.billService.addBill(bill);

    // Create observer object
    const myObserver = {
      next: x => console.log('Observer got a next value: ' + x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        this.snackBar.open('Die Rechnung für die Reservierung mit der Id ' + row.id + ' wurde erfolgreich erstellt!',
          null, { duration: 3000 });
        this.ngOnInit();
      }
    };

    result.subscribe(myObserver);
  }

  deleteReservation(row: Reservation) {
    this.clickedAction = true;

    // Create observer object
    const myObserver = {
      next: x => console.log('Observer got a next value: ' + x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        this.snackBar.open('Die Reservierung mit der Id ' + row.id + ' wurde erfolgreich gelöscht!',
          null, { duration: 3000 });
        this.ngOnInit();
      }
    };

    if (confirm('Wollen Sie die Reservierung mit der Id ' + row.id + ' wirklich löschen?')) {
      const result: Observable<Object> = this.reservationService.deleteReservation(row.id);
      result.subscribe(myObserver);
    }
  }
}
