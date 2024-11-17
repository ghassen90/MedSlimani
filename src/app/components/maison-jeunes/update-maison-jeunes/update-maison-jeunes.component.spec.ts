import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaisonJeunesComponent } from './update-maison-jeunes.component';

describe('UpdateMaisonJeunesComponent', () => {
  let component: UpdateMaisonJeunesComponent;
  let fixture: ComponentFixture<UpdateMaisonJeunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMaisonJeunesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMaisonJeunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
