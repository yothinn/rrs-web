import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestuarantNotFoundComponent } from './restuarant-not-found.component';

describe('RestuarantNotFoundComponent', () => {
  let component: RestuarantNotFoundComponent;
  let fixture: ComponentFixture<RestuarantNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestuarantNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestuarantNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
