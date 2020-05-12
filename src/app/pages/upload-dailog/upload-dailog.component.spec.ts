import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDailogComponent } from './confirmation-dailog.component';

describe('ConfirmationDailogComponent', () => {
  let component: ConfirmationDailogComponent;
  let fixture: ComponentFixture<ConfirmationDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
