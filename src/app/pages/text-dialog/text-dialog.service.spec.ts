import { TestBed } from '@angular/core/testing';

import { ConfirmationDailogService } from './confirmation-dailog.service';

describe('ConfirmationDailogService', () => {
  let service: ConfirmationDailogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationDailogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
