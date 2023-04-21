import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/shared/services/register.service'
import { Tutor } from 'src/app/shared/interfaces/tutor'
import { Patient } from 'src/app/shared/interfaces/patient'
import { TutorService } from 'src/app/shared/services/tutor.service'
import { PatientService } from 'src/app/shared/services/patient.service'

@Component({
  selector: 'app-tprofile',
  templateUrl: './tprofile.component.html',
  styleUrls: ['./tprofile.component.scss']
})
export class TProfileComponent implements OnInit {
  tutor: any = {
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

  constructor(private registerService: RegisterService, private tutorService: TutorService, private patientService: PatientService) {}

  hijos: any = []
  hijosArray: any = []

  ngOnInit(): void {
    this.tutorService.setTutorProfile('641e47725ad83e88452cd701'); // id sacado con token, de mientras es el de Karla

    this.tutorService.getTutor().subscribe((response: any) => {
      this.tutor = response

      for(let i = 0; i < this.tutor.hijos.length; i++)
      {
        this.hijos.push(this.tutor.hijos[i])
      }
      
      for(let i = 0; i < this.hijos.length; i++)
      {
        this.patientService.id = this.hijos[i];
        this.patientService.getPatient().subscribe((response: any) => {
          console.log(response)
          this.hijosArray.push(response);
        });
      }

    });

  }

  createPatient(patient: any){
    this.registerService.createPatient(patient);
  }

  updateTutor(id: string) {
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
    this.tutorService.updateTutor(obj, id);
  }

  deleteTutor(id: string) {
    this.tutorService.deleteTutor(id);
  }

}
