import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaisonJeunesComponent } from './add-maison-jeunes.component';

describe('AddMaisonJeunesComponent', () => {
  let component: AddMaisonJeunesComponent;
  let fixture: ComponentFixture<AddMaisonJeunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMaisonJeunesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaisonJeunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
