import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/shared/interfaces/patient';
import { Professional } from 'src/app/shared/interfaces/professional'
import { PatientService } from 'src/app/shared/services/patient.service';
import { ProfessionalService } from 'src/app/shared/services/professional.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  professional: any = {
  }
  idProf: String = ''

  patients: any = []
  pArray: any = []
  patientsProf: any = []
  imageLinkCp : any =  [];

  constructor(private professionalService: ProfessionalService, private patientService: PatientService) {}

  ngOnInit(): void {
    this.professionalService.setProfessionalProfile('641e3aa760a550973418d30e')
    this.professionalService.getProfessional().subscribe((response: any) => {
      this.professional = response
    });

    this.patientService.getPatients().subscribe((response: any) => {
      this.patients= response.patient;
      
      
      for(let i = 0; i < this.patients.length; i++)
      {
        for(let j = 0; j < this.patients[i].currentProffesionals.length; j++)
        {
          if(this.patients[i].currentProffesionals[j] == this.professional._id)
          {
            this.patientsProf.push(this.patients[i])
            this.imageLinkCp.push("url('https://randomuser.me/api/portraits/women/" + i + ".jpg')");
          }
        }
      }

      console.log(this.patientsProf)
      
    });
  }

  updateProfessional(id: string, obj: any) {
    this.professionalService.updateProfessional(obj, id);
  }

  deleteProfessional(id: string) {
    this.professionalService.deleteProfessional(id);
  }

  changeProfessionalPassword(id: string, password: string){
    this.professionalService.id = id;
    this.professionalService.getProfessional().subscribe((response: any) => {
        response.password = password;
        this.professionalService.updateProfessional(response, id);
      
    });
  }
  
}
