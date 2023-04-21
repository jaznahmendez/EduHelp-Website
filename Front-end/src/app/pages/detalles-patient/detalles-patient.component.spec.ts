import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPatientComponent } from './detalles-patient.component';

describe('DetallesPatientComponent', () => {
  let component: DetallesPatientComponent;
  let fixture: ComponentFixture<DetallesPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
