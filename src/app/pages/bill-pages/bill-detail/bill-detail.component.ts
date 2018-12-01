import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Reservation} from '../../../entities/reservation';
import {BillService} from '../../../services/bill.service';
import {ActivatedRoute} from '@angular/router';
import {BillDetail} from '../../../entities/bill-detail';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  bill: BillDetail;
  private billId: number;

  constructor(private billService: BillService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.billId = +params['id'];
      this.fetchBill(this.billId);
    });
  }

  fetchBill(id: number) {
    this.billService.getBillById(this.billId).subscribe(bill => this.bill = bill);
  }

  getMinStartDate(reservations: Reservation[]): String {
    return this.getDateString(new Date(Math.min.apply(null, reservations.map(res => new Date(res.startDate)))).toString());

  }

  getMaxEndDate(reservations: Reservation[]): String {
    return this.getDateString(new Date(Math.max.apply(null, reservations.map(res => new Date(res.endDate)))).toString());
  }

  getDateString (date: string): String {
    const myDate = new Date(date);
    return myDate.toLocaleDateString('de');
  }

  getDateTimeString (date: string): String {
    const myDate = new Date(date);
    return myDate.toLocaleDateString('de') + ' ' + myDate.toLocaleTimeString('de');
  }

  getMaxDiscount(reservations: Reservation[]): String {
    return Math.max.apply(null, reservations.map(res => Number(res.customer.discount)));
  }

  sendPaymentConfirmation() {
    console.log('TODO: CALL SERVICE');
    // TODO: Call service and redirect to e.g. Rechnungen
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
