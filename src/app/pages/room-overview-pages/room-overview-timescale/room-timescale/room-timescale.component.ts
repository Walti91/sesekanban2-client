import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../../../entities/room';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../../../services/room.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-room-timescale',
  templateUrl: './room-timescale.component.html',
  styleUrls: ['./room-timescale.component.scss']
})
export class RoomTimescaleComponent implements OnInit {

  @Input()
  room: Room;

  from = new FormControl('', [Validators.required]);
  to = new FormControl('', [Validators.required]);

  free;
  wasRequest = false;

  dateForm: FormGroup = new FormGroup({
      from: this.from,
      to: this.to
    }
  );

  constructor(private roomService: RoomService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'cancel', sanitizer.bypassSecurityTrustResourceUrl('assets/outline-cancel-24px.svg'));
    iconRegistry.addSvgIcon(
      'ok', sanitizer.bypassSecurityTrustResourceUrl('assets/outline-check_circle-24px.svg'));
    iconRegistry.addSvgIcon(
      'unknown', sanitizer.bypassSecurityTrustResourceUrl('assets/outline-help_outline-24px.svg'));
  }

  ngOnInit() {
  }

  onDateChanged() {
    if (this.dateForm.valid) {
      this.roomService.isRoomFree(this.room.id,
        new Date(this.from.value), new Date(this.to.value)).subscribe(roomFree => {
          this.free = roomFree.free;
          this.wasRequest = true;
      });
    }
  }
}
