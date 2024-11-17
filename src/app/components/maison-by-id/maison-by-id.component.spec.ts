import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisonByIdComponent } from './maison-by-id.component';

describe('MaisonByIdComponent', () => {
  let component: MaisonByIdComponent;
  let fixture: ComponentFixture<MaisonByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaisonByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaisonByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
