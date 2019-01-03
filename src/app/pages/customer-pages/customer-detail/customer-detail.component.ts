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
  birthday = new FormControl('', [Validators.required]);
  gender = new FormControl('');
  billingAddress = new FormControl('', [Validators.required]);
  companyName = new FormControl('');
  note = new FormControl('');
  discount = new FormControl('', [Validators.pattern('[0-9]*'), Validators.min(0), Validators.max(100)]);
  telephonenumber = new FormControl('', [Validators.pattern('[0-9]*')]);
  email = new FormControl('', [Validators.required, Validators.email]);
  web = new FormControl('');
  fax = new FormControl('', [Validators.pattern('[0-9]*')]);

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
    this.customerService.getCustomerById(this.customerId).subscribe(customer => this.customer = customer);
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

    const result: Observable<Customer> = this.customerService.updateCustomer(this.customer, this.customerId);

    console.log('RESULT: ');
    console.log(result.subscribe(value => value));

    this.router.navigateByUrl('/customers');
  }





}
