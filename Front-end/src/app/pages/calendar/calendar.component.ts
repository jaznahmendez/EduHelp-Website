import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid'
import interaction from '@fullcalendar/interaction'
import { HttpClient } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { TokenService } from 'src/app/shared/services/token.service';
import { AppointmentComponent } from './appointment/appointment.component';
import { MatDialog } from '@angular/material/dialog';
import { CalendarService } from 'src/app/shared/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private accessToken : string | null;
  private calendarObj : any;
  public events: Array<any> = [];
  private calendarListObj: any;
  private externalCalendarId : string = '';
  tutor : boolean = true;

  constructor(private calendarService: CalendarService, private authService: SocialAuthService, private httpClient: HttpClient, private tokenService: TokenService, public dialog: MatDialog) {
    this.accessToken = '';
   }

  ngOnInit(): void {
    this.accessToken = this.tokenService.getToken();
    this.externalCalendarId = localStorage.getItem('externalCalendar') || '';
    console.log(this.accessToken);
    //this.getGoogleCalendarData();
    this.getGoogleCalendarData(this.externalCalendarId);
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
        this.calendarOptions.events = this.events;
        //console.log(this.events);
        //console.log(this.calendarOptions.events);
      });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timegrid, interaction], //  
    events: [{}]
  };

  printEvent(arg: any){
    console.log(arg);
  }

  openAppointmentDialog(): void {
    const dialogRef = this.dialog.open(AppointmentComponent, {
      data: {
        /*accessToken: this.accessToken,
        events: this.events,
        professionalCalendarId: this.professionalCalendarId*/
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
