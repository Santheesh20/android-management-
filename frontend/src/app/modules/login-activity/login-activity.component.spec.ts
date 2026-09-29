import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginActivityModule } from './login-activity.module';

import { LoginActivityComponent } from './login-activity.component';

describe('LoginActivityComponent', () => {
  let component: LoginActivityComponent;
  let fixture: ComponentFixture<LoginActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginActivityModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginActivityComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
