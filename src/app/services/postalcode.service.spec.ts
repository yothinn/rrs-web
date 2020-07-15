import { TestBed } from '@angular/core/testing';

import { PostalcodeService } from './postalcode.service';

describe('PostalcodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostalcodeService = TestBed.get(PostalcodeService);
    expect(service).toBeTruthy();
  });
});
