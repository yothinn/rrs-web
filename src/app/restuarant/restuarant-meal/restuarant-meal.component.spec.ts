import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestuarantMealComponent } from './restuarant-meal.component';

describe('RestuarantMealComponent', () => {
  let component: RestuarantMealComponent;
  let fixture: ComponentFixture<RestuarantMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestuarantMealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestuarantMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
