import { Component, Output, EventEmitter } from '@angular/core';
import { Patient } from 'src/app/shared/interfaces/patient'
import { PatientService } from 'src/app/shared/services/patient.service'

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  p: Patient[]= [];
  pArray: any[] = [];
  patient: Patient = {
    name: '',
    email: '',
    password: '',
    tutorId: ''
  }
  id = '';

  constructor(private patientService: PatientService) {
    this.getPatients();
  }

  //  [routerLink]="item" (onSelected)="setProfessional($event)"

  @Output() onSelectedPatient: EventEmitter<any> = new EventEmitter();

  getPatientById(item: any) {
    this.onSelectedPatient.emit(item)
    //console.log(item._id)
    this.id = item._id;
    this.patient = item
    this.patientService.setPatient(item);
    this.patientService.getPatient();
  }

  setPatient(patient: any) {
    console.log('hi')
    this.patient = patient
    this.patientService.setPatient(patient);
  }

  getPatients() {
    this.patientService.getPatients().subscribe((response: any) => {
      this.p = response.patient;
      
      for (const key in this.p) {
        if (this.p.hasOwnProperty(key)) {
          this.pArray.push(this.p[key]);
        }
      }
    });
  }
}
