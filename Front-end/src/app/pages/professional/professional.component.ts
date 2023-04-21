import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Professional } from 'src/app/shared/interfaces/professional'
import { ProfessionalService } from 'src/app/shared/services/professional.service'

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent {
  p: Professional[]= [];
  pArray: any[] = [];
  professional: Professional = {
    name: '',
    email: '',
    password: '',
    telefono: ''
  }
  id = '';

  constructor(private professionalService: ProfessionalService) {
    this.getProfessionals();
  }

  //  [routerLink]="item" (onSelected)="setProfessional($event)"

  @Output() onSelected: EventEmitter<any> = new EventEmitter();

  getProfessionalById(item: any) {
    this.onSelected.emit(item)
    //console.log(item._id)
    this.id = item._id;
    this.professional = item
    this.professionalService.setProfessional(item);
    this.professionalService.getProfessional();
  }

  setProfessional(professional: any) {
    console.log('hi')
    this.professional = professional
    this.professionalService.setProfessional(professional);
  }

  getProfessionals() {
    this.professionalService.getProfessionals().subscribe((response: any) => {
      this.p = response.professional;
      
      for (const key in this.p) {
        if (this.p.hasOwnProperty(key)) {
          this.pArray.push(this.p[key]);
        }
      }
    });

  }

}
