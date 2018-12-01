import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatButtonModule,
  MatGridListModule,
  MatTableModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatIconModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatSelectModule,
  MatExpansionModule,
  MatCardModule
} from '@angular/material';
import { CustomerComponent } from './pages/customer-pages/customer/customer.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { CustomerAddComponent } from './pages/customer-pages/customer-add/customer-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReservationDetailComponent } from './pages/reservation-pages/reservation-detail/reservation-detail.component';
import { ReservationComponent } from './pages/reservation-pages/reservation/reservation.component';
import { ReservationAddComponent } from './pages/reservation-pages/reservation-add/reservation-add.component';
import { BillComponent } from './pages/bill-pages/bill/bill.component';
import { BillAddComponent } from './pages/bill-pages/bill-add/bill-add.component';
import { BillDetailComponent } from './pages/bill-pages/bill-detail/bill-detail.component';

const appRoutes: Routes = [
  { path: '', component: CustomerComponent},  // TODO: Change this to reservation-component since that would be probably the most used one.
  { path: 'customers', component: CustomerComponent },
  { path: 'reservations', component: ReservationComponent },
  { path: 'customers/add', component: CustomerAddComponent },
  { path: 'reservations/detail/:id', component: ReservationDetailComponent },
  { path: 'reservation/add', component: ReservationAddComponent },
  { path: 'bills', component: BillComponent },
  { path: 'bills/add', component: BillAddComponent },
  { path: 'bills/detail/:id', component: BillDetailComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerAddComponent,
    ReservationDetailComponent,
    BillComponent,
    BillAddComponent,
    ReservationComponent,
    ReservationAddComponent,
    BillDetailComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
    MatExpansionModule,
    MatCardModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'de-DE'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
