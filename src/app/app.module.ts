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
  MatCardModule, MatSortModule,
  MatProgressSpinnerModule,
  MatCheckboxModule
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
import { RoomOverviewTimescaleComponent } from './pages/room-overview-pages/room-overview-timescale/room-overview-timescale.component';
import { RoomTimescaleComponent } from './pages/room-overview-pages/room-overview-timescale/room-timescale/room-timescale.component';
import { LogComponent } from './pages/log-pages/log/log.component';
import { CustomerDetailComponent } from './pages/customer-pages/customer-detail/customer-detail.component';
import { RoomDashboardComponent } from './pages/room-overview-pages/room-dashboard/room-dashboard.component';

const appRoutes: Routes = [
  { path: '', component: RoomDashboardComponent},  // TODO: Change this to reservation-component since that would be probably the most used one.
  { path: 'customers', component: CustomerComponent },
  { path: 'reservations', component: ReservationComponent },
  { path: 'customers/add', component: CustomerAddComponent },
  { path: 'reservations/detail/:id', component: ReservationDetailComponent },
  { path: 'reservation/add', component: ReservationAddComponent },
  { path: 'bills', component: BillComponent },
  { path: 'bills/add', component: BillAddComponent },
  { path: 'bills/detail/:id', component: BillDetailComponent },
  { path: 'rooms/timescale', component: RoomOverviewTimescaleComponent },
  { path: 'logs', component: LogComponent },
  { path: 'customers/detail/:id', component: CustomerDetailComponent },
  { path: 'dashboard', component: RoomDashboardComponent },
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
    RoomOverviewTimescaleComponent,
    RoomTimescaleComponent,
    LogComponent,
    CustomerDetailComponent,
    RoomDashboardComponent,
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
    MatCardModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'de-DE'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
