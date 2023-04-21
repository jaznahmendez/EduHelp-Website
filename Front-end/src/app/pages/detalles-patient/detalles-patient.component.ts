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
    currentProfessionals: '',
    tutorDescription: ''
  }

  tutor: any = {}
  currentProfessionals: any = []
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

      for(let i = 0; i < this.patient.currentProffesionals.length; i++)
      {
        this.currentProfessionals.push(this.patient.currentProffesionals[i])
      }
      
      for(let i = 0; i < this.currentProfessionals.length; i++)
      {
        this.professionalService.id = this.currentProfessionals[i];
        this.professionalService.getProfessional().subscribe((response: any) => {
          console.log(response)
          this.cp.push(response);
        });
      }
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
