import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/shared/interfaces/patient'
import { PatientService } from 'src/app/shared/services/patient.service'

@Component({
  selector: 'app-pprofile',
  templateUrl: './pprofile.component.html',
  styleUrls: ['./pprofile.component.scss']
})
export class PprofileComponent implements OnInit {
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
  idPatient: String = '';

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatient().subscribe((response: any) => {
      this.patient = response
    });
  }

  updatePatient(id: string) {
    let obj = {
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
    this.patientService.updatePatient(obj, id);
  }

  deletePatient(id: string) {
    this.patientService.deletePatient(id);
  }

}
