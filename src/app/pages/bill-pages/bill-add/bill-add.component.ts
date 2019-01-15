import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../../entities/customer';
import {CustomerService} from '../../../services/customer.service';
import {Room} from '../../../entities/room';
import {Router} from '@angular/router';
import {Reservation} from '../../../entities/reservation';
import {Bill} from '../../../entities/bill';
import {Observable} from 'rxjs';
import {ReservationService} from '../../../services/reservation.service';
import {BillService} from '../../../services/bill.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-bill-add',
  templateUrl: './bill-add.component.html',
  styleUrls: ['./bill-add.component.scss']
})
export class BillAddComponent implements OnInit {

  reservations: Reservation[];
  reservationIds = []

  //reservations table
  displayedColumns: String[] = ['select', 'Id', 'startDate', 'End Datum', 'Kunde', 'Zimmer'];
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.reservations.length;
    return numSelected === numRows;
  }
  updateReservationIds(row){
    this.selection.toggle(row);
    
    this.reservationIds = [];
    for(var i=0;i<this.selection.selected.length;i++){
      this.reservationIds.push(this.selection.selected[i].id);
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.reservations.forEach(row => this.selection.select(row));
  }
  selection = new SelectionModel<Reservation>(true, []);


  //spinner
  color = 'primary';
  mode = 'indeterminate';
  value = 20;
  submitClicked = false;

  
  constructor(private billService: BillService, private reservationService: ReservationService, private router: Router, private formBuilder: FormBuilder) {
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
    this.reservationService.getAllReservations().subscribe(r => this.reservations = r);
  }

  onSubmit() {
    console.log('Clicked Submit');

    const bill: Bill = new Bill();
    bill.reservationIds = this.reservationIds;

    const result: Observable<Bill> = this.billService.addBill(bill);

    // Create observer object
    const myObserver = {
      next: x => console.log('Observer got a next value: ' + x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => this.router.navigateByUrl('/bills')
    };

    result.subscribe(myObserver);

    this.submitClicked = true;

  }
}
