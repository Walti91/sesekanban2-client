import {Room} from './room';

export class RoomReservation {

  id: number;
  adults: number;
  children: number;
  room: Room;
  pension: string;
  from: Date;
  to: Date;

  roomId: number;
  name: string;
  price: number;
}
