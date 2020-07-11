import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestuarantUserComponent } from './restuarant-user.component';

describe('RestuarantUserComponent', () => {
  let component: RestuarantUserComponent;
  let fixture: ComponentFixture<RestuarantUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestuarantUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestuarantUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
