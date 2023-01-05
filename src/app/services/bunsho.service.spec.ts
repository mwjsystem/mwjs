import { TestBed } from '@angular/core/testing';

import { BunshoService } from './bunsho.service';

describe('BunshoService', () => {
  let service: BunshoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BunshoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
