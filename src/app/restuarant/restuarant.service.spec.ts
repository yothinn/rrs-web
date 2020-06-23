import { TestBed } from '@angular/core/testing';

import { RestuarantService } from './restuarant.service';

describe('RestuarantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestuarantService = TestBed.get(RestuarantService);
    expect(service).toBeTruthy();
  });
});
