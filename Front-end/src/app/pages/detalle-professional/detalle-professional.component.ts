import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Professional } from 'src/app/shared/interfaces/professional'
import { ProfessionalService } from 'src/app/shared/services/professional.service'
import { Patient } from 'src/app/shared/interfaces/patient'
import { PatientService } from 'src/app/shared/services/patient.service'
import { ActivatedRoute, Router } from '@angular/router';

import { io } from 'socket.io-client';
import { environment } from 'src/app/environments/environment'
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-detalle-professional',
  templateUrl: './detalle-professional.component.html',
  styleUrls: ['./detalle-professional.component.scss']
})
export class DetalleProfessionalComponent implements OnInit {
  professional: any = {
    name: '',
    profession: '',
    email: '',
    password: '',
    telefono: '',
    token: '',
    location: '',
    link: '',
    patients: ['']
  }

  patients: any = []
  pArray: any = []
  patientsProf: any = []
  id: string = ''

  socket: any;

  @Output() onSelectedPatient: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router, private loginService: LoginService,
    private route: ActivatedRoute, private professionalService: ProfessionalService, private patientService: PatientService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.professionalService.id = this.id

    this.professionalService.getProfessional().subscribe((response: any) => {
      this.professional = response
      console.log(this.professional);
      localStorage.setItem('externalCalendar', this.professional.calendarId);
      this.patientService.getPatients().subscribe((response: any) => {
        this.patients= response.patient;
        
        for(let i = 0; i < this.patients.length; i++)
        {
          for(let j = 0; j < this.patients[i].currentProffesionals.length; j++)
          {
            if(this.patients[i].currentProffesionals[j] == this.professional._id)
            {
              this.patientsProf.push(this.patients[i])
            }
          }
        }

        console.log(this.patientsProf)
        
      });
    });
  }

  getPatientById(item: any)
  {
    this.onSelectedPatient.emit(item)
    this.patientService.setPatient(item);
    this.patientService.getPatient();
  }
  
}
