import { Component, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Professional } from 'src/app/shared/interfaces/professional'
import { ProfessionalService } from 'src/app/shared/services/professional.service'

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnChanges {
  p: Professional[]= [];
  pArray: any[] = [];
  professional: Professional = {
    name: '',
    email: '',
    password: '',
    telefono: ''
  }
  id = '';
  itemsFiltrados: any[] = []
  buscar: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.itemsFiltrados = this.pArray;
  }

  constructor(private professionalService: ProfessionalService) {
    this.getProfessionals();
    this.itemsFiltrados = this.pArray;
  }
  filtrar() {
    //console.log('items: ', this.itemsFiltrados)
    const buscar = this.buscar.toLowerCase();
    console.log("hiciste click ", buscar)
    this.itemsFiltrados = this.pArray.filter((item) => {
     // console.log(item.name)
      return item.name?.toLowerCase().includes(buscar);
    });
  }

  getProfessionalById(item: any) {
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
