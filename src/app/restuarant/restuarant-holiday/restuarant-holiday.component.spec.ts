import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestuarantHolidayComponent } from './restuarant-holiday.component';

describe('RestuarantHolidayComponent', () => {
  let component: RestuarantHolidayComponent;
  let fixture: ComponentFixture<RestuarantHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestuarantHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestuarantHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
