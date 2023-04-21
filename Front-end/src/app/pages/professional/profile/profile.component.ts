import { Component, OnInit } from '@angular/core';
import { Professional } from 'src/app/shared/interfaces/professional'
import { ProfessionalService } from 'src/app/shared/services/professional.service'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  professional: any = {
    name: '',
    profession: '',
    email: '',
    password: '',
    telefono: '',
    token: '',
    location: '',
    link: '',
    active: false,
    patients: ['']
  }
  idProf: String = ''

  constructor(private professionalService: ProfessionalService) {}

  ngOnInit(): void {
    this.professionalService.getProfessional().subscribe((response: any) => {
      this.professional = response
    });
  }

  updateProfessional(id: string) {
    let obj = {
      name: '',
      profession: '',
      email: '',
      password: '',
      telefono: '',
      token: '',
      location: '',
      link: '',
      active: false,
      patients: ['']
    }
    this.professionalService.updateProfessional(obj, id);
  }

  deleteProfessional(id: string) {
    this.professionalService.deleteProfessional(id);
  }
  
}
