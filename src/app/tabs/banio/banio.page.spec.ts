import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BanioPage } from './banio.page';

describe('BanioPage', () => {
  let component: BanioPage;
  let fixture: ComponentFixture<BanioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BanioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
