import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoAppUpdateComponent } from './auto-app-update.component';

describe('AutoAppUpdateComponent', () => {
  let component: AutoAppUpdateComponent;
  let fixture: ComponentFixture<AutoAppUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoAppUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoAppUpdateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
