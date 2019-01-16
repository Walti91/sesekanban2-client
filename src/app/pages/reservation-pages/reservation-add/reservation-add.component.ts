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

  //spinner
  color = 'primary';
  mode = 'indeterminate';
  value = 20;
  submitClicked = false;

  constructor(private customerService: CustomerService, private roomService: RoomService, private reservationService: ReservationService, private router: Router, private formBuilder: FormBuilder) {
  }

  startDate = new FormControl('', [Validators.required]);
  endDate = new FormControl('', [Validators.required]);
  customerId = new FormControl('', [Validators.required]);

  roomId = new FormControl('', [Validators.required]);
  adults = new FormControl('', [Validators.required]);
  children = new FormControl('', [Validators.required]);
  pension = new FormControl('', [Validators.required]);
  from = new FormControl('', [Validators.required]);
  to = new FormControl('', [Validators.required]);

  roomReservations: RoomReservation[] = [];

  displayedColumns = ['name', 'pension', 'adults', 'children', 'from', 'to'];
  dataSource = new MatTableDataSource(this.roomReservations);

  isDisabled = true;

  reservationForm: FormGroup = new FormGroup({
      startDate: this.startDate,
      endDate: this.endDate,
      customerId: this.customerId,
    }
  );

  roomReservationForm: FormGroup = new FormGroup({
    roomId: this.roomId,
    adults: this.adults,
    children: this.children,
    pension: this.pension,
    from: this.from,
    to: this.to
  });

  customers: Customer[];
  rooms: Room[];
  room: Room;
  capacityAdults = 0;
  capacity = 0;
  start: Date;
  end: Date;

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

    // Create observer object
    const myObserver = {
      next: x => console.log('Observer got a next value: ' + x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => this.router.navigateByUrl('/reservations')
    };

    result.subscribe(myObserver);

    this.submitClicked = true;
    //this.router.navigateByUrl('/reservations');
  }

  checkDates() {
    this.start = this.startDate.value;
    this.end = this.endDate.value;
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
    this.capacity = this.room.capacity;
  }

  addRoomReservation() {
    const roomReservation: RoomReservation = new RoomReservation();
    console.log(this.room);
    
    //this check is here so that it is not possible to add the same room twice in one reservation
    var roomExists = false;
    for(var i=0;i<this.roomReservations.length;i++){
      if(this.roomReservations[i].roomId===this.roomId.value){
        roomExists=true;      
      }
    }
    if(!roomExists){
      if (this.room.capacityAdults >= this.adults.value && this.adults.value >= 0 && this.room.capacity >= this.adults.value + this.children.value && this.children.value >= 0) {
        roomReservation.name = this.room.name;
        roomReservation.roomId = this.roomId.value;
        roomReservation.adults = this.adults.value;
        roomReservation.children = this.children.value;
        roomReservation.pension = this.pension.value===''?'BREAKFAST':this.pension.value;
        roomReservation.from = this.from.value;
        roomReservation.to = this.to.value;
        this.roomReservations.push(roomReservation);
        this.dataSource = new MatTableDataSource<RoomReservation>(this.roomReservations);
        this.rooms.splice(this.rooms.indexOf(this.room), 1);
      }
    }
    
  }

  createCustomer() {
    this.router.navigateByUrl('/customers/add');
  }
}
