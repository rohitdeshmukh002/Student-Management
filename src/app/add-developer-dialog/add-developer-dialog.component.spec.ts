import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeveloperDialogComponent } from './add-developer-dialog.component';

describe('AddDeveloperDialogComponent', () => {
  let component: AddDeveloperDialogComponent;
  let fixture: ComponentFixture<AddDeveloperDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDeveloperDialogComponent]
    });
    fixture = TestBed.createComponent(AddDeveloperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
