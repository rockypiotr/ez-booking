import { TestBed } from '@angular/core/testing';

import { SuccessMeterService } from './success-meter.service';

describe('SuccessMeterService', () => {
  let service: SuccessMeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccessMeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
