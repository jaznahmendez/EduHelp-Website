import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid'
import interaction from '@fullcalendar/interaction'
import { HttpClient } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { TokenService } from 'src/app/shared/services/token.service';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { AppointmentComponent } from '../appointment/appointment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss']
})
export class MyCalendarComponent {
  private accessToken : string | null;
  private calendarObj : any;
  private events: Array<any> = [];
  private calendarListObj: any;
  private professionalCalendarId = {};

  constructor(private calendarService: CalendarService, private authService: SocialAuthService, private httpClient: HttpClient, private tokenService: TokenService, public dialog: MatDialog) {
    this.accessToken = '';
   }

  ngOnInit(): void {
    this.accessToken = this.tokenService.getToken();
    console.log(this.accessToken);
    //this.getGoogleCalendarData();
    this.calendarService.getGoogleCalendarList();
  }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }
  

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timegrid, interaction], //  
    events: this.calendarService.events
  };

  printEvent(arg: any){
    console.log(arg);
  }
}
