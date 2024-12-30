import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechnologiesDialogComponent } from './add-technologies-dialog.component';

describe('AddTechnologiesDialogComponent', () => {
  let component: AddTechnologiesDialogComponent;
  let fixture: ComponentFixture<AddTechnologiesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTechnologiesDialogComponent]
    });
    fixture = TestBed.createComponent(AddTechnologiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
