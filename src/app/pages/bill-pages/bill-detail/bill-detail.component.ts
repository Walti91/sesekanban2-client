import {ApplicationRef, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Reservation} from '../../../entities/reservation';
import {BillService} from '../../../services/bill.service';
import {ActivatedRoute} from '@angular/router';
import {BillDetail} from '../../../entities/bill-detail';
import {Reminder} from '../../../entities/reminder';
import {forEach} from '@angular/router/src/utils/collection';
import {PaymentService} from '../../../services/payment.service';
import {MatSnackBar, MatDialog} from '@angular/material';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  bill: BillDetail;
  private billId: number;
  private reminderSent: String = 'undefined';

  discount = new FormControl('', [Validators.required]);

  discountForm: FormGroup = new FormGroup({
       discount: this.discount
    });

  constructor(private billService: BillService, private paymentService: PaymentService, private route: ActivatedRoute, public snackBar: MatSnackBar, public dialog: MatDialog, private formBuilder: FormBuilder) { }

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

  sendPaymentConfirmation(id: number) {

      this.paymentService.sendPaymentMail(id).subscribe(payment => {
        if (payment) {
          this.bill.payments.find(p => p.id === payment.id).emailSent = true;
        } else {
          this.bill.payments.find(p => p.id === payment.id).emailSent = false;
        }
      });

  }

  sendReminder() {
    this.billService.sendReminder(this.billId).subscribe(reminder => {
      if (reminder.emailSent) {
        this.reminderSent = 'true';
      } else {
        this.reminderSent = 'false';
      }
    });
  }

  cancelBill() {
    this.billService.cancelBill(this.billId).subscribe(bill => {
      this.bill.cancelled = bill.cancelled;
    });
  }

  updateBillDiscount() {
    this.billService.updateBillDiscount(this.billId,this.discount.value).subscribe(bill => {
      this.bill.amount = bill.amount;
      this.bill.discount = this.discount.value;
      this.snackBar.open('Der Rabatt wurde erfolgreich aktualisiert auf '+this.bill.discount+'. Der neue Preis ist '+this.bill.amount+' €.',
          null, { duration: 3000 });
    });
  }

  getPdf() {
    this.billService.getBillPdfById(this.billId).subscribe(pdfStringBase64 => {
      const link = document.createElement('a');
      link.setAttribute('href', pdfStringBase64.billPdf);
      link.setAttribute('download', 'Rechnung.pdf');

      document.body.appendChild(link);

      link.click();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
