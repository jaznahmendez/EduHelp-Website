import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/shared/services/register.service'
import { Tutor } from 'src/app/shared/interfaces/tutor'
import { Patient } from 'src/app/shared/interfaces/patient'
import { TutorService } from 'src/app/shared/services/tutor.service'
import { PatientService } from 'src/app/shared/services/patient.service'
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { NewPatientComponent } from './new-patient/new-patient.component';

@Component({
  selector: 'app-tprofile',
  templateUrl: './tprofile.component.html',
  styleUrls: ['./tprofile.component.scss']
})
export class TProfileComponent implements OnInit {

  imageLink : any =  [];

  tutor: any = {
    name: '',
    email: '',
    password: ''
  }

  newPatient: any = {
    name: '',
    tutorId: '641e47725ad83e88452cd701',
    email: '',
    password: '',
    age: 0,
    gender: '',
    tutorDescription: ''
  }

  constructor(private registerService: RegisterService, private tutorService: TutorService, private patientService: PatientService, public dialog: MatDialog) { }

  hijos: any = []
  hijosArray: any = []
  

  ngOnInit(): void {
    this.tutorService.setTutorProfile('641e47725ad83e88452cd701'); // id sacado con token, de mientras es el de Carlos

    this.tutorService.getTutor().subscribe((response: any) => {
      this.tutor = response

      for(let i = 0; i < this.tutor.hijos.length; i++)
      {
        this.hijos.push(this.tutor.hijos[i])
      }
      
      for(let i = 0; i < this.hijos.length; i++)
      {
        this.patientService.id = this.hijos[i];
        this.patientService.getPatient().subscribe((response: any) => {
          console.log(response)
          if(response != null)this.hijosArray.push(response);
          this.imageLink.push("url('https://randomuser.me/api/portraits/women/" + i + ".jpg')");
        });
      }

    });

  }

  changeTutorPassword(id: string, password: string){
    this.tutorService.id = id;
    this.tutorService.getTutor().subscribe((response: any) => {
        response.password = password;
        this.tutorService.updateTutor(response, id);
      
    });
  }

  createPatient(patient: any){
    this.registerService.createPatient(patient);
  }

  updateTutor(obj: object,id: string) {
    this.tutorService.updateTutor(obj, id);
  }

  deleteTutor(id: string) {
    this.tutorService.deleteTutor(id);
  }

  deletePatient(id: string) {
    console.log('hi')
    this.patientService.deletePatient(id);
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { name: this.tutor.name, telefono: this.tutor.telefono, email: this.tutor.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result){
        this.newPatient.name = result.name;
        this.newPatient.email = result.email;
        this.tutor.telefono = result.telefono;
        console.log(this.tutor)
        this.tutorService.updateTutor(result, '641e47725ad83e88452cd701');
      }
    });
  }

  openNewDialog(): void {
    const dialogRef = this.dialog.open(NewPatientComponent, {
      data: {...this.newPatient}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result){
        this.newPatient = {...result}
      }
    });
  }
}
