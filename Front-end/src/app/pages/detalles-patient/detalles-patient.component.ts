import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/shared/interfaces/patient'
import { PatientService } from 'src/app/shared/services/patient.service'
import { TutorService } from 'src/app/shared/services/tutor.service'
import { ProfessionalService } from 'src/app/shared/services/professional.service'

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
    currentProffesionals: '',
    tutorDescription: ''
  }

  tutor: any = {}
  currentProffesionals: any = []
  cp: any = []

  constructor(private patientService: PatientService, private tutorService: TutorService, private professionalService: ProfessionalService) {}

  ngOnInit(): void {
    this.patientService.getPatient().subscribe((response: any) => {
      this.patient = response
      this.tutorService.id = this.patient.tutorId

      this.tutorService.getTutor().subscribe((response: any) => {
        console.log(response)
        this.tutor = response
      });
    });
  }

  getTutor(){
    this.tutorService.setTutor(this.tutor);
    this.tutorService.getTutor();
  }

  getProfessionalById(item: any)
  {
    this.professionalService.setProfessional(item);
    this.professionalService.getProfessional();
  }
}
