import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandingModule } from '../branding.module';

import { AddBrandingComponent } from './add-branding.component';

describe('AddBrandingComponent', () => {
  let component: AddBrandingComponent;
  let fixture: ComponentFixture<AddBrandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBrandingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
