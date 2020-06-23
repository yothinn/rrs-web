import { TestBed } from '@angular/core/testing';

import { UserPermissionServiceService } from './user-permission.service';

describe('UserPermissionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPermissionServiceService = TestBed.get(UserPermissionServiceService);
    expect(service).toBeTruthy();
  });
});
