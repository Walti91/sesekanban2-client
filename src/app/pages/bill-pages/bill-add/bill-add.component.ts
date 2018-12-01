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

@Component({
  selector: 'app-bill-add',
  templateUrl: './bill-add.component.html',
  styleUrls: ['./bill-add.component.scss']
})
export class BillAddComponent implements OnInit {

  //cancelled = new FormControl('', [Validators.required]);
  reservationIds = new FormControl('', [Validators.required]);
  //reminders = new FormControl('', [Validators.required]);
  //amount = new FormControl('', [Validators.required]);

  billForm: FormGroup = new FormGroup({
      //cancelled: this.isCancelled,
      reservationIds: this.reservationIds,
      //amount: this.amount
      //reminders: this.reminders,
    }
  );

  reservations: Reservation[];
  
  constructor(private billService: BillService, private reservationService: ReservationService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.reservationService.getAllReservations().subscribe(r => this.reservations = r);
    console.log("res: "+this.reservations);
  }

  onSubmit() {
    console.log('Clicked Submit');

    const bill: Bill = new Bill();
    bill.reservationIds = this.reservationIds.value;

    const result: Observable<Bill> = this.billService.addBill(bill);

    console.log('RESULT: ');
    console.log(result.subscribe(value => value));

    this.router.navigateByUrl('/bills');
  }
}
