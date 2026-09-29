import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAppsComponent } from './upload-apps.component';

describe('UploadAppsComponent', () => {
  let component: UploadAppsComponent;
  let fixture: ComponentFixture<UploadAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadAppsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadAppsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
