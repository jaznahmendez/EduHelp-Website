import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfDialogComponent } from './edit-prof-dialog.component';

describe('EditProfDialogComponent', () => {
  let component: EditProfDialogComponent;
  let fixture: ComponentFixture<EditProfDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
