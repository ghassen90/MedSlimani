import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJeunesComponent } from './list-jeunes.component';

describe('ListJeunesComponent', () => {
  let component: ListJeunesComponent;
  let fixture: ComponentFixture<ListJeunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListJeunesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListJeunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
