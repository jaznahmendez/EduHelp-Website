import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { TokenService } from './token.service';
import { TutorService } from './tutor.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService  {
  private accessToken : string | null;
  private calendarObj : any;
  private response : any;
  private events: Array<any> = [];
  private calendarListObj: any;
  private professionalCalendarId = {};
  private emails : Array<any> = [];

  constructor(private tutorService: TutorService, private authService: SocialAuthService, private httpClient: HttpClient, private tokenService: TokenService) {
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
          this.createAccess(id);
        }
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
      this.createAccess(this.response.id);
    });
  }

  createAccess(externalCalendar: string): void{
    this.tutorService.getTutors().subscribe((tutors : any) => {
      
      for(let i = 0; i < tutors.tutor.length; i++){
        setTimeout(() => {
          console.log(tutors.tutor[i].email);
          this.singleAccess(tutors.tutor[i].email, externalCalendar);
            }, 100 * i);
      }
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
}
