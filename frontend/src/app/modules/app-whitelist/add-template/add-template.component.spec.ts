import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppWhitelistModule } from '../app-whitelist.module';

import { AddTemplateComponent } from './add-template.component';

describe('AddTemplateComponent', () => {
  let component: AddTemplateComponent;
  let fixture: ComponentFixture<AddTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppWhitelistModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTemplateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
