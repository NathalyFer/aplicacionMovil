import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitacionPage } from './habitacion.page';

describe('HabitacionPage', () => {
  let component: HabitacionPage;
  let fixture: ComponentFixture<HabitacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
