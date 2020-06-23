import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestuarantInfoComponent } from './restuarant-info.component';

describe('RestuarantInfoComponent', () => {
  let component: RestuarantInfoComponent;
  let fixture: ComponentFixture<RestuarantInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestuarantInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestuarantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
