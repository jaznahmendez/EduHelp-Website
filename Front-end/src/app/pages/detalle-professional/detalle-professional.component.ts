import { Component, OnInit } from '@angular/core';
import { Professional } from 'src/app/shared/interfaces/professional'
import { ProfessionalService } from 'src/app/shared/services/professional.service'

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

  constructor(private professionalService: ProfessionalService) {}

  ngOnInit(): void {
    //console.log('holaaaa')
    this.professionalService.getProfessional().subscribe((response: any) => {
      this.professional = response
    });
   
  }
  
}
