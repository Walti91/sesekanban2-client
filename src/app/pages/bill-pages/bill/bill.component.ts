import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Reservation} from '../../../entities/reservation';
import {Bill} from '../../../entities/bill';
import {BillService} from '../../../services/bill.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  allBills: Bill[];
  displayedColumns: String[] = ['Id', 'Abgesagt', 'Amount', 'Reservation', 'Reminder', 'Payment'];

  constructor(private billService: BillService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router) {
    iconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-add-24px.svg'));
  }

  onSearchChange(searchValue: string ) {

    if (searchValue != null) {
      this.billService.getBillsByKeyword(searchValue).subscribe(bills => this.allBills = bills);
    }

  }

  searchForBill(search: string) {

  }

  ngOnInit() {
    this.billService.getAllBills().subscribe(bills => this.allBills = bills);
  }

  openDetailForBill(row: Reservation) {
    console.log(row.id);

    this.router.navigate(['bills', 'detail', row.id], {skipLocationChange: false});
  }
}
