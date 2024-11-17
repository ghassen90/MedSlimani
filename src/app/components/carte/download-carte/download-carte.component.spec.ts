import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCarteComponent } from './download-carte.component';

describe('DownloadCarteComponent', () => {
  let component: DownloadCarteComponent;
  let fixture: ComponentFixture<DownloadCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
