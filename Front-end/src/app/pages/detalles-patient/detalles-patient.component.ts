import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/shared/interfaces/patient'
import { PatientService } from 'src/app/shared/services/patient.service'


@Component({
  selector: 'app-detalles-patient',
  templateUrl: './detalles-patient.component.html',
  styleUrls: ['./detalles-patient.component.scss']
})
export class DetallesPatientComponent implements OnInit {
  patient: any = {
    name: '',
    email: '',
    password: '',
    tutorId: '',
    age: 0,
    gender: '',
    pastProfessionals: '',
    currentProfessionals: '',
    tutorDescription: ''
  }

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatient().subscribe((response: any) => {
      this.patient = response
    });
   
  }
}
