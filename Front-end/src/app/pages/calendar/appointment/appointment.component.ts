import { HttpClient } from '@angular/common/http';
import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from 'src/app/shared/interfaces/patient';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {

  firstFormGroup: FormGroup;

  constructor( FormBuilder: FormBuilder, public dialogRef: MatDialogRef<AppointmentComponent>, private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.firstFormGroup = FormBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required]],
      emailPatient: ['', [Validators.required, Validators.email]],
      emailTutor: ['', [Validators.required,Validators.email]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createAppointment(): void{
      //console.log(this.data.events);
      //console.log(this.firstFormGroup.value);
  }

  
}
