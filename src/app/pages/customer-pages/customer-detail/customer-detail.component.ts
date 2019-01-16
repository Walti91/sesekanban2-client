import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {CustomerService} from '../../../services/customer.service';
import {Customer} from '../../../entities/customer';
import {ActivatedRoute, Router} from '@angular/router';
import {Gender} from '../../../entities/gender.enum';



@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  name = new FormControl('', [Validators.required]);
  birthday = new FormControl('',[Validators.required]);
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

  private genderOptions = [
    {value: "MALE", viewValue: 'Männlich'},
    {value: "FEMALE", viewValue: 'Weiblich'},
    {value: "OTHER", viewValue: 'Anderes'}
  ];




  private customerId: number;
  private sub: Subscription;
  customer: Customer;



  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {



    this.sub = this.route.params.subscribe(params => {
      this.customerId = +params['id'];
      this.fetchCustomer(this.customerId);
    });

  }

  fetchCustomer(id: number) {
    this.customerService.getCustomerById(this.customerId).subscribe(customer => {
      this.customer = customer;

      this.name.setValue(customer.name);

      const cBirthday = new Date(new Date(customer.birthday).valueOf() - (new Date(customer.birthday)).getTimezoneOffset() * 60 * 1000);
      this.birthday.setValue(cBirthday.toISOString().substring(0, 10));

      this.gender.setValue(customer.gender);
      this.billingAddress.setValue(customer.billingAddress);
      this.companyName.setValue(customer.companyName);
      this.note.setValue(customer.note);
      this.discount.setValue(customer.discount);
      this.telephonenumber.setValue(customer.telephoneNumber);
      this.email.setValue(customer.email);
      this.web.setValue(customer.web);
      this.fax.setValue(customer.fax);
    });
  }

  getErrorMessage() {
    return this.email.hasError('email') ? 'Dies ist keine gültige E-Mail Adresse.' : '';
  }

  getBirthday(birthday: string): Date
  {
    return new Date(birthday);
  }

  onSubmit() {
    console.log('Clicked Submit');

    if (this.name.dirty) {
      this.customer.name = this.name.value;
    }

    if (this.birthday.dirty) {
      this.customer.birthday = new Date(this.birthday.value);
    }

    if (this.gender.dirty) {
      this.customer.gender = ((Gender[this.gender.value as number]) as unknown) as Gender;
    }

    if (this.billingAddress.dirty) {
      this.customer.billingAddress = this.billingAddress.value;
    }

    if (this.companyName.dirty) {
      this.customer.companyName = this.companyName.value;
    }

    if (this.note.dirty) {
      this.customer.note = this.note.value;
    }

    if (this.discount.dirty) {
      this.customer.discount = this.discount.value;
    }

    if (this.telephonenumber.dirty) {
      this.customer.telephoneNumber = this.telephonenumber.value;
    }

    if (this.email.dirty) {
      this.customer.email = this.email.value;
    }

    if (this.web.dirty) {
      this.customer.web = this.web.value;
    }

    if (this.fax.dirty) {
      this.customer.fax = this.fax.value;
    }

    console.log(this.customer);

    const result: Observable<Customer> = this.customerService.updateCustomer(this.customer, this.customerId);

    console.log('RESULT: ');
    console.log(result.subscribe(value => value));

    this.router.navigateByUrl('/customers');
  }





}
