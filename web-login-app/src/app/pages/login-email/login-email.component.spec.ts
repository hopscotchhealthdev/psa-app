import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginEmailComponent } from './login-emal.component';



describe('LoginComponent', () => {
  let component: LoginEmailComponent;
  let fixture: ComponentFixture<LoginEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
