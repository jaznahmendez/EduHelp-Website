import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/shared/interfaces/patient'
import { PatientService } from 'src/app/shared/services/patient.service'
import { TutorService } from 'src/app/shared/services/tutor.service'
import { ProfessionalService } from 'src/app/shared/services/professional.service'
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EditPatientDialogComponent } from './edit-patient-dialog/edit-patient-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pprofile',
  templateUrl: './pprofile.component.html',
  styleUrls: ['./pprofile.component.scss']
})
export class PprofileComponent implements OnInit {
  patient: any = {}
  tutor: any = {}
  idPatient: string = '';
  currentProfessionals: any = [];
  pastProffesionals: any = [];
  pp: any = [];
  cp: any = []
  imageLinkCp : any =  [];
  imageLinkPp : any =  [];

  constructor(private route: ActivatedRoute, private patientService: PatientService, private tutorService: TutorService, private professionalService: ProfessionalService, public dialog: MatDialog) {}

  ngOnInit(): 
  void { 
    this.route.params.subscribe(params => {
      this.idPatient = params['id'];
    });

    this.patientService.setPatientProfile(this.idPatient); // id sacado con token, de mientras es el de Karla

    this.patientService.getPatient().subscribe((response: any) => {
      this.patient = response
      this.tutorService.id = this.patient.tutorId

      this.tutorService.getTutor().subscribe((response: any) => {
        console.log(response)
        this.tutor = response
      });

      for(let i = 0; i < this.patient.currentProffesionals.length; i++)
      {
        this.currentProfessionals.push(this.patient.currentProffesionals[i]);
        let temp = 50 + i;
        this.imageLinkCp.push("url('https://randomuser.me/api/portraits/women/" + temp + ".jpg')");
      }
      
      for(let i = 0; i < this.currentProfessionals.length; i++)
      {
        this.professionalService.id = this.currentProfessionals[i];
        this.professionalService.getProfessional().subscribe((response: any) => {
          console.log(response)
          this.cp.push(response);
        });
      }

      for(let i = 0; i < this.patient.pastProffesionals.length; i++)
      {
        this.currentProfessionals.push(this.patient.pastProffesionals[i]);
        let temp = 50 + i;
        this.imageLinkPp.push("url('https://randomuser.me/api/portraits/women/" + temp + ".jpg')");
      }
      
      for(let i = 0; i < this.pastProffesionals.length; i++)
      {
        this.professionalService.id = this.pastProffesionals[i];
        this.professionalService.getProfessional().subscribe((response: any) => {
          console.log(response)
          this.pp.push(response);
        });
      }
    });
    


  }

  updatePatient(id: string, obj: any) {
    this.patientService.updatePatient(obj, id);
  }

  deletePatient(id: string) {
    this.patientService.deletePatient(id);
  }

  changePatientPassword(id: string, password: string){
    this.patientService.id = id;
    this.patientService.getPatient().subscribe((response: any) => {
        response.password = password;
        this.patientService.updatePatient(response, id);
      
    });
  }

  openTutorProfile(id: string){
    console.log(id);
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditPatientDialogComponent, {
      data: { ...this.patient }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result){
        console.log('res: ',result);
        console.log('id: ',this.patient._id);
        this.patientService.updatePatient(result, this.patient._id);
        this.patient = result;
      }
    });
  }



}
