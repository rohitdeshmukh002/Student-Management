import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsapExample1Component } from './gsap-example-1.component';

describe('GsapExample1Component', () => {
  let component: GsapExample1Component;
  let fixture: ComponentFixture<GsapExample1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GsapExample1Component]
    });
    fixture = TestBed.createComponent(GsapExample1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
