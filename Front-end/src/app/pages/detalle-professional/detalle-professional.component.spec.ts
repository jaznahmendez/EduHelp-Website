import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProfessionalComponent } from './detalle-professional.component';

describe('DetalleProfessionalComponent', () => {
  let component: DetalleProfessionalComponent;
  let fixture: ComponentFixture<DetalleProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleProfessionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
