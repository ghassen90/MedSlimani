import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJeunesComponent } from './add-jeunes.component';

describe('AddJeunesComponent', () => {
  let component: AddJeunesComponent;
  let fixture: ComponentFixture<AddJeunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJeunesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJeunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
