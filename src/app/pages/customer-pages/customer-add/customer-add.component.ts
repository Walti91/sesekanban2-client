import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Gender} from '../../../entities/gender.enum';
import {CustomerService} from '../../../services/customer.service';
import {Customer} from '../../../entities/customer';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';

export interface SelectGender {
  value: Gender;
  viewValue: string;
}

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  //spinner
  color = 'primary';
  mode = 'indeterminate';
  value = 20;
  submitClicked = false;

  name = new FormControl('', [Validators.required]);
  birthday = new FormControl('', [Validators.required]);
  gender = new FormControl('');
  billingAddress = new FormControl('', [Validators.required]);
  companyName = new FormControl('');
  note = new FormControl('');
  discount = new FormControl('', [Validators.pattern('[0-9]*'), Validators.min(0), Validators.max(100)]);
  telephonenumber = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.email]);
  web = new FormControl('');
  fax = new FormControl('');

  customerForm: FormGroup = new FormGroup({
    name: this.name,
    birthday: this.birthday,
    gender: this.gender,
    billingAddress: this.billingAddress,
    companyName: this.companyName,
    note: this.note,
    discount: this.discount,
    telephonenumber: this.telephonenumber,
    email: this.email,
    web: this.web,
    fax: this.fax
    }
  );

  genders: SelectGender[] = [
    {value: Gender.MALE, viewValue: 'Männlich'},
    {value: Gender.FEMALE, viewValue: 'Weiblich'},
    {value: Gender.OTHER, viewValue: 'Anderes'}
  ];

  constructor(private customerService: CustomerService, private router: Router, private formBuilder: FormBuilder, private location: Location) {
  }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('email') ? 'Dies ist keine gültige E-Mail Adresse.' : '';
  }

  onSubmit() {
    console.log('Clicked Submit');
    const customer: Customer = new Customer();
    customer.name = this.name.value;
    customer.birthday = new Date(this.birthday.value);
    customer.gender = ((Gender[this.gender.value as number]) as unknown) as Gender;
    customer.billingAddress = this.billingAddress.value;
    customer.companyName = this.companyName.value;
    customer.note = this.note.value;
    customer.discount = this.discount.value;
    customer.telephoneNumber = this.telephonenumber.value;
    customer.email = this.email.value;
    customer.web = this.web.value;
    customer.fax = this.fax.value;

    console.log(customer);

    const result: Observable<Customer> = this.customerService.addCustomer(customer);

    // Create observer object
    const myObserver = {
      next: x => console.log('Observer got a next value: ' + x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => this.router.navigateByUrl('/customers')
    };

    result.subscribe(myObserver);

    console.log('RESULT: ');
    console.log(result.subscribe(value => value));

    this.submitClicked = true;
  }

}
