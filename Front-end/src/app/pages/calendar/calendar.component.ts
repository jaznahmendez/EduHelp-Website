import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid'
import interaction from '@fullcalendar/interaction'
import { HttpClient } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private accessToken : string | null;

  constructor(private authService: SocialAuthService, private httpClient: HttpClient, private tokenService: TokenService) {
    this.accessToken = '';
   }

  ngOnInit(): void {
    this.accessToken = this.tokenService.getToken();
    console.log(this.accessToken);
    this.getGoogleCalendarData();
  }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }

  getGoogleCalendarData(): void {
    if (!this.accessToken) return;

    this.httpClient
      .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .subscribe((events) => {
        alert('Look at your console');
        console.log('events', events);
      });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timegrid, interaction],
    dateClick: this.handleDateClick.bind(this), //  
    events: [
      { title: 'event 1', date: new Date()}, 
      { title: 'event 2', date: '2023-05-27' }
    ]
  };

  handleDateClick(arg: any) {
    console.log('click');
  }

  printEvent(){
    console.log('yeah');
  }
}
