import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthPhoneComponent } from './auth-phone.component';




describe('LoginComponent', () => {
  let component: AuthPhoneComponent;
  let fixture: ComponentFixture<AuthPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
