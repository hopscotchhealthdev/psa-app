import { TestBed } from '@angular/core/testing';
import { TextDailogService } from './text-dialog.service';


describe('TextDailogService', () => {
  let service: TextDailogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextDailogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
