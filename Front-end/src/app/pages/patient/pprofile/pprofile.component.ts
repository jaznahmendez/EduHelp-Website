import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/shared/interfaces/patient'
import { PatientService } from 'src/app/shared/services/patient.service'
import { TutorService } from 'src/app/shared/services/tutor.service'
import { ProfessionalService } from 'src/app/shared/services/professional.service'

@Component({
  selector: 'app-pprofile',
  templateUrl: './pprofile.component.html',
  styleUrls: ['./pprofile.component.scss']
})
export class PprofileComponent implements OnInit {
  patient: any = {}
  tutor: any = {}
  idPatient: string = '';
  currentProfessionals: any = []
  cp: any = []

  constructor(private patientService: PatientService, private tutorService: TutorService, private professionalService: ProfessionalService) {}

  ngOnInit(): 
  void { 
    this.patientService.setPatientProfile('641e68619a05a988c6bf61f1'); // id sacado con token, de mientras es el de Karla

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
