import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import {Customer} from '../../../entities/customer';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  allCustomers: Customer[];
  displayedColumns: String[] = ['Id', 'Name', 'Geburtsdatum', 'Geschlecht', 'Rechnungsadresse', 'Firmenname', 'Notiz', 'Rabatt',
    'Telefonnummer', 'E-Mail', 'Web', 'Fax'];

  constructor(private customerService: CustomerService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-add-24px.svg'));
}

  getBirthdate (birthday: string): String {
    const myDate = new Date(birthday);
  return myDate.toLocaleDateString('de');
}

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(customers => this.allCustomers = customers);
  }


}
