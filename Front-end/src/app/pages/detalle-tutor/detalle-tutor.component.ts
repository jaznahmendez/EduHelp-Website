import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tutor } from 'src/app/shared/interfaces/tutor'
import { Patient } from 'src/app/shared/interfaces/patient'
import { TutorService } from 'src/app/shared/services/tutor.service'
import { PatientService } from 'src/app/shared/services/patient.service'

@Component({
  selector: 'app-detalle-tutor',
  templateUrl: './detalle-tutor.component.html',
  styleUrls: ['./detalle-tutor.component.scss']
})
export class DetalleTutorComponent implements OnInit{
  tutor: any = {}
  hijos: any[] = []
  p: Patient[] = []

  constructor(private tutorService: TutorService, private patientService: PatientService) {}
  @Output() onSelectedPatient: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.tutorService.getTutor().subscribe((response: any) => {
      this.tutor = response
    });
    this.tutorService.getPatients().subscribe((response: any) => {
      this.p = response;
      console.log(this.p)
      for (const key in this.p) {
        if (this.p.hasOwnProperty(key)) {
          this.hijos.push(this.p[key]);
        }
      }
    });
  }

  getPatientById(item: any) {
    this.onSelectedPatient.emit(item)
    this.patientService.setPatient(item);
    this.patientService.getPatient();
  }

}
