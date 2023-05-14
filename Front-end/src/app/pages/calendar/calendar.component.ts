import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid'
import interaction from '@fullcalendar/interaction'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
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
