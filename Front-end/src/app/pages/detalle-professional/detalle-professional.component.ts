import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Professional } from 'src/app/shared/interfaces/professional'
import { ProfessionalService } from 'src/app/shared/services/professional.service'
import { Patient } from 'src/app/shared/interfaces/patient'
import { PatientService } from 'src/app/shared/services/patient.service'
import { ActivatedRoute } from '@angular/router';

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

  @Output() onSelectedPatient: EventEmitter<any> = new EventEmitter();

  constructor(private route: ActivatedRoute, private professionalService: ProfessionalService, private patientService: PatientService) {}

  ngOnInit(): void {
    //console.log('holaaaa')
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.professionalService.id = this.id

    this.professionalService.getProfessional().subscribe((response: any) => {
      this.professional = response

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
