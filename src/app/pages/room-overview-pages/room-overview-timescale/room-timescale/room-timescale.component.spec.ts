import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTimescaleComponent } from './room-timescale.component';

describe('RoomTimescaleComponent', () => {
  let component: RoomTimescaleComponent;
  let fixture: ComponentFixture<RoomTimescaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomTimescaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomTimescaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
