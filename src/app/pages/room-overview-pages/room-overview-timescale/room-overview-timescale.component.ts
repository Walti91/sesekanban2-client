import { Component, OnInit } from '@angular/core';
import {Room} from '../../../entities/room';
import {RoomService} from '../../../services/room.service';

@Component({
  selector: 'app-room-overview-timescale',
  templateUrl: './room-overview-timescale.component.html',
  styleUrls: ['./room-overview-timescale.component.scss']
})
export class RoomOverviewTimescaleComponent implements OnInit {

  allRooms: Room[];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.getAllRooms().subscribe(rooms => this.allRooms = rooms);
  }

}
