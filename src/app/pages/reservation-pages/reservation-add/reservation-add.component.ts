import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../../entities/customer';
import {CustomerService} from '../../../services/customer.service';
import {Room} from '../../../entities/room';
import {RoomService} from '../../../services/room.service';
import {Router} from '@angular/router';
import {Reservation} from '../../../entities/reservation';
import {Observable} from 'rxjs';
import {ReservationService} from '../../../services/reservation.service';
import {RoomReservation} from '../../../entities/room-reservation';
import {MatTableDataSource} from '@angular/material';
import {log} from 'util';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.scss']
})
export class ReservationAddComponent implements OnInit {

  constructor(private customerService: CustomerService, private roomService: RoomService, private reservationService: ReservationService, private router: Router, private formBuilder: FormBuilder) {
  }

  startDate = new FormControl('', [Validators.required]);
  endDate = new FormControl('', [Validators.required]);
  customerId = new FormControl('', [Validators.required]);
  roomId = new FormControl('', [Validators.required]);
  adults = new FormControl('', [Validators.required]);
  children = new FormControl('', [Validators.required]);

  roomReservations: RoomReservation[] = [];

  displayedColumns = ['name', 'adults', 'children'];
  dataSource = new MatTableDataSource(this.roomReservations);

  isDisabled = true;

  reservationForm: FormGroup = new FormGroup({
      startDate: this.startDate,
      endDate: this.endDate,
      customerId: this.customerId,
      roomId: this.roomId,
      adults: this.adults,
      children: this.children
    }
  );

  customers: Customer[];
  rooms: Room[];
  room: Room;
  capacityAdults = 0;
  capcityChildren = 0;

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(c => this.customers = c);
  }

  onSubmit() {
    console.log('Clicked Submit');

    const reservation: Reservation = new Reservation();
    reservation.startDate = this.startDate.value;
    reservation.endDate = this.endDate.value;
    reservation.customerId = this.customerId.value;
    reservation.roomReservations = this.roomReservations;

    const result: Observable<Reservation> = this.reservationService.addReservation(reservation);

    console.log('RESULT: ');
    console.log(result.subscribe(value => value));

    this.router.navigateByUrl('/reservations');
  }

  checkDates() {
      this.isDisabled = this.startDate.value > this.endDate.value;
      if (!this.isDisabled) {
        this.roomService.getFreeRooms(this.startDate.value, this.endDate.value).subscribe(r => this.rooms = r);
      } else {
        this.roomReservations = [];
      }
  }

  updateRoom() {
    this.room = this.rooms.find(element => element.id === this.roomId.value);
    this.capacityAdults = this.room.capacityAdults;
    this.capcityChildren = this.room.capacity;
  }

  addRoomReservation() {
    const roomReservation: RoomReservation = new RoomReservation();
    console.log(this.room);
    if (this.room.capacityAdults >= this.adults.value && this.room.capacity >= this.adults.value + this.children.value) {
      roomReservation.name = this.room.name;
      roomReservation.roomId = this.roomId.value;
      roomReservation.adults = this.adults.value;
      roomReservation.children = this.children.value;
      this.roomReservations.push(roomReservation);
      this.dataSource = new MatTableDataSource<RoomReservation>(this.roomReservations);
      this.rooms.splice(this.rooms.indexOf(this.room), 1);
    }
  }

  createCustomer() {
    this.router.navigateByUrl('/customers/add');
  }
}
