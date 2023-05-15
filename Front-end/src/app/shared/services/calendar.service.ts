import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { TokenService } from './token.service';
import { TutorService } from './tutor.service';
import { PatientService } from './patient.service';
import { ProfessionalService } from './professional.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService  {
  private accessToken : string | null;
  private calendarObj : any;
  private response : any = {};
  public events: Array<any> = [];
  private calendarListObj: any;
  private professionalCalendarId = {};
  private emails : Array<any> = [];
  private userId : string = '';

  constructor(private professionalService: ProfessionalService,private patientService: PatientService,private tutorService: TutorService, private authService: SocialAuthService, private httpClient: HttpClient, private tokenService: TokenService) {
    this.accessToken = tokenService.getToken();
   } 

  getGoogleCalendarList(): void {
    this.httpClient
      .get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .subscribe((res) => {
        console.log(res);
        this.calendarListObj = res;
        let items = this.calendarListObj.items;
        let id;
        for(let i = 0; i < items.length; i++){
          if(items[i].summary == 'EduHelp'){
            id = items[i].id;
          }
        }
        if(!id){
          this.createCalendar();
        }else{
          this.response.id = id;
          if(localStorage.getItem('userType') == 'professional'){
            this.createAccessProfessional(id);
            this.getGoogleCalendarData(this.response.id);
          }else if (localStorage.getItem('userType') == 'patient'){
            this.createAccessPatient(id);
            this.getGoogleCalendarData(this.response.id);
          }else{
            localStorage.setItem('myCalendar', id);
            this.getGoogleCalendarData(this.response.id);
          }
        }
        console.log(id)
        
      });
  }

  createCalendar(): void{
    let obj = {
      "summary": "EduHelp"
    }
    this.httpClient
    .post('https://www.googleapis.com/calendar/v3/calendars', obj , {
      headers: { Authorization: `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json' },
    })
    .subscribe((res) => {
      this.response = res;
      if(localStorage.getItem('userType') == 'professional'){
        this.createAccessProfessional(this.response.id);
        this.putCalendarProfessional(this.response.id);
        this.getGoogleCalendarData(this.response.id);
      }else if (localStorage.getItem('userType') == 'patient'){
        this.createAccessPatient(this.response.id);
        this.putCalendarPatient(this.response.id);
        this.getGoogleCalendarData(this.response.id);
      }else{
        localStorage.setItem('myCalendar', this.response.id);
        this.getGoogleCalendarData(this.response.id);
      }
    });
  }

  createAccessProfessional(externalCalendar: string): void{
    this.tutorService.getTutors().subscribe((tutors : any) => {
      
      for(let i = 0; i < tutors.tutor.length; i++){
        setTimeout(() => {
          console.log(tutors.tutor[i].email);
          this.singleAccess(tutors.tutor[i].email, externalCalendar);
            }, 100 * i);
      }
      this.putCalendarProfessional(this.response.id);
    })
  }

  createAccessPatient(calendar: string): any{
    this.patientService.getPatient().subscribe((response : any) => {
      this.tutorService.getTutorById(response.tutorId).subscribe((response: any) => {
        this.singleAccess(response.email, calendar);
        this.putCalendarPatient(this.response.id);
      })
    })
  }

  singleAccess(email: string, calendar: string): void{
    this.httpClient
    .post('https://www.googleapis.com/calendar/v3/calendars/' + calendar + '/acl', {
      "role": "writer",
    "scope": {
      "type": "user",
      "value": email
    }
    } , {
      headers: { Authorization: `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json' },
    }).subscribe((res) => {
      console.log(res);
    });
  }

  putCalendarProfessional(calendar : string){
    let obj = {
      calendarId : calendar
    }
    this.userId = localStorage.getItem('userId') || '123';
    this.professionalService.updateProfessional(obj, this.userId);
  }

  putCalendarPatient(calendar : string){
    let obj = {
      calendarId : calendar
    }
    this.userId = localStorage.getItem('userId') || '123';
    this.patientService.updatePatient(obj, this.userId);
  }

  getGoogleCalendarData(calendarId: string): void {
    if (!this.accessToken) return;
    console.log(calendarId);
    this.httpClient
      .get('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .subscribe((res) => {
        console.log('events', res);
        this.calendarObj = res;
        for(let i = 0; i < this.calendarObj.items.length; i++){
            //console.log(this.calendarObj.items[i]);
            this.events.push({
              title: this.calendarObj.items[i].summary,
              start: this.calendarObj.items[i].start.date == undefined ? this.calendarObj.items[i].start.dateTime : this.calendarObj.items[i].start.date,
              end: this.calendarObj.items[i].end.date  == undefined ? this.calendarObj.items[i].end.dateTime : this.calendarObj.items[i].end.date
            });
        }
        console.log(this.events);
      });
  }

  makeAppointment(calendar : string, start: string, end:string): void{
    this.httpClient
    .post('https://www.googleapis.com/calendar/v3/calendars/' + calendar + '/events', {
      "end": {
        "dateTime": end
      },
      "start": {
        "dateTime": start
      }
    }, {
      headers: { Authorization: `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json' },
    }).subscribe((res) => {
      console.log(res);
    });

  }
}
