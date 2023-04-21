import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/shared/services/register.service'
import { Tutor } from 'src/app/shared/interfaces/tutor'
import { Patient } from 'src/app/shared/interfaces/patient'
import { TutorService } from 'src/app/shared/services/tutor.service'

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

  constructor(private registerService: RegisterService, private tutorService: TutorService) {}

  ngOnInit(): void {
    this.tutorService.getTutor().subscribe((response: any) => {
      this.tutor = response
    });
  }

  createPatient(name: String, email: String, password: String, tutorId: String, age: Number, gender: String, tutorDescription: String){
    let patient: any = {
      name: name,
      email: email,
      password: password,
      tutorId: tutorId,
      age: age,
      gender: gender,
      pastProfessionals: '',
      currentProfessionals: '',
      tutorDescription: tutorDescription
    }
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
