import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceManagementModule } from '../device-management.module';

import { DeviceInventoryComponent } from './device-inventory.component';

describe('DeviceInventoryComponent', () => {
  let component: DeviceInventoryComponent;
  let fixture: ComponentFixture<DeviceInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceManagementModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceInventoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
