import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppWhitelistModule } from './app-whitelist.module';

import { AppWhitelistComponent } from './app-whitelist.component';

describe('AppWhitelistComponent', () => {
  let component: AppWhitelistComponent;
  let fixture: ComponentFixture<AppWhitelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppWhitelistModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppWhitelistComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
