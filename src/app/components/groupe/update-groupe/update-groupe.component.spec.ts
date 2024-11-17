import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGroupeComponent } from './update-groupe.component';

describe('UpdateGroupeComponent', () => {
  let component: UpdateGroupeComponent;
  let fixture: ComponentFixture<UpdateGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
