import { Component, OnInit } from '@angular/core';
import { Professional } from 'src/app/shared/interfaces/professional'
import { ProfessionalService } from 'src/app/shared/services/professional.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  professional: any = {
  }
  idProf: string = ''

  constructor(private professionalService: ProfessionalService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idProf = params['id'];
      //console.log(id); // will output "123"
    });
    this.professionalService.setProfessionalProfile(this.idProf)
    this.professionalService.getProfessional().subscribe((response: any) => {
      this.professional = response
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
