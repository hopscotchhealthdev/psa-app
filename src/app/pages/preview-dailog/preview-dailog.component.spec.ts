import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviewDailogComponent } from './preview-dailog.component';

describe('PreviewDailogComponent', () => {
  let component: PreviewDailogComponent;
  let fixture: ComponentFixture<PreviewDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
