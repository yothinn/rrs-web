import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionDialogComponent } from './user-permission-dialog.component';

describe('UserPermissionDialogComponent', () => {
  let component: UserPermissionDialogComponent;
  let fixture: ComponentFixture<UserPermissionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPermissionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
