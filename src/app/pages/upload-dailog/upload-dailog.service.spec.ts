import { TestBed } from '@angular/core/testing';
import { UploadDailogService } from './upload-dailog.service';



describe('UploadDailogService', () => {
  let service: UploadDailogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadDailogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
