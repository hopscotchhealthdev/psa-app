import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TextDailogComponent } from './text-dialog.component';


describe('TextDailogComponent', () => {
  let component: TextDailogComponent;
  let fixture: ComponentFixture<TextDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
