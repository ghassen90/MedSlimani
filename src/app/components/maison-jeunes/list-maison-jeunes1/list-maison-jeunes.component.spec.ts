import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaisonJeunesComponent } from './list-maison-jeunes.component';

describe('ListMaisonJeunesComponent', () => {
  let component: ListMaisonJeunesComponent;
  let fixture: ComponentFixture<ListMaisonJeunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMaisonJeunesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaisonJeunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
