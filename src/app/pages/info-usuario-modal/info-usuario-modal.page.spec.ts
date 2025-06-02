import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoUsuarioModalPage } from './info-usuario-modal.page';

describe('InfoUsuarioModalPage', () => {
  let component: InfoUsuarioModalPage;
  let fixture: ComponentFixture<InfoUsuarioModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoUsuarioModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
