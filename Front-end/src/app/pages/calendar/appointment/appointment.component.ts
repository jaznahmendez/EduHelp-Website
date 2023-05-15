import { HttpClient } from '@angular/common/http';
import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from 'src/app/shared/interfaces/patient';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { TutorService } from 'src/app/shared/services/tutor.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {

  firstFormGroup: FormGroup;

  constructor( private calendarService: CalendarService, private tutorService: TutorService, FormBuilder: FormBuilder, public dialogRef: MatDialogRef<AppointmentComponent>, private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.firstFormGroup = FormBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required]],
      emailPatient: ['', [Validators.email]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createAppointment(): void{
    //conseguir calendario patient
    let myP = '';
    let myCal = localStorage.getItem('myCalendar') || '';
    let profCal = localStorage.getItem('externalCalendar') || '';
    this.tutorService.getPatients().subscribe((response : any) => {
      console.log(response);
      for(let i = 0; i < response.length; i++){
        if(response[i].email == this.firstFormGroup.value.emailPatient){
           console.log(response[i].calendarioId);
            myP = response[i].calendarioId
        }
      }
      console.log(this.firstFormGroup)
      let startString = this.firstFormGroup.value.startDate + ":00.000Z";
      let endString = this.firstFormGroup.value.endDate + ":00.000Z";
      this.calendarService.makeAppointment(myCal, startString , endString);
      this.calendarService.makeAppointment(myP, startString, endString);
      this.calendarService.makeAppointment(profCal, startString, endString);
      
      //alert('Success!');
    })

    //insert event en mi propio calendario

    //insert event en calendario patient

    //insert event calendari professional
      //console.log(this.data.events);
      //console.log(this.firstFormGroup.value);
  }

  
}
