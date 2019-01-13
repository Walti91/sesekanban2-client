import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomOverviewTimescaleComponent } from './room-overview-timescale.component';

describe('RoomOverviewTimescaleComponent', () => {
  let component: RoomOverviewTimescaleComponent;
  let fixture: ComponentFixture<RoomOverviewTimescaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomOverviewTimescaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomOverviewTimescaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
