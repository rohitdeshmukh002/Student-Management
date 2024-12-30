import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsapExample2Component } from './gsap-example-2.component';

describe('GsapExample2Component', () => {
  let component: GsapExample2Component;
  let fixture: ComponentFixture<GsapExample2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GsapExample2Component]
    });
    fixture = TestBed.createComponent(GsapExample2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
