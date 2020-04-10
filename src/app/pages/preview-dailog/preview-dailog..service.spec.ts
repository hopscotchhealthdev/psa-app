import { TestBed } from '@angular/core/testing';
import { PreviewDailogService } from './preview-dailog..service';



describe('PreviewDailogService', () => {
  let service: PreviewDailogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewDailogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
