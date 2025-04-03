import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterfazPage } from './interfaz.page';

describe('InterfazPage', () => {
  let component: InterfazPage;
  let fixture: ComponentFixture<InterfazPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfazPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
