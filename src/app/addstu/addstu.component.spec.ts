import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstuComponent } from './addstu.component';

describe('AddstuComponent', () => {
  let component: AddstuComponent;
  let fixture: ComponentFixture<AddstuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddstuComponent]
    });
    fixture = TestBed.createComponent(AddstuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
