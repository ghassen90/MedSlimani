import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPointsCadeauxComponent } from './list-points-cadeaux.component';

describe('ListPointsCadeauxComponent', () => {
  let component: ListPointsCadeauxComponent;
  let fixture: ComponentFixture<ListPointsCadeauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPointsCadeauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPointsCadeauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
