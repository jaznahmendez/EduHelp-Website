import { Component, Output, EventEmitter } from '@angular/core';
import { Tutor } from 'src/app/shared/interfaces/tutor'
import { TutorService } from 'src/app/shared/services/tutor.service'

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent {
  p: Tutor[]= [];
  pArray: any[] = [];
  tutor: Tutor = {
    name: '',
    email: '',
    password: '',
    telefono: ''
  }
  id = '';

  constructor(private tutorService: TutorService) {
    this.getTutors();
  }

  @Output() onSelectedTutor: EventEmitter<any> = new EventEmitter();

  getTutorById(item: any) {
    this.onSelectedTutor.emit(item)
    //console.log(item._id)
    this.id = item._id;
    this.tutor = item
    this.tutorService.setTutor(item);
    this.tutorService.getTutor();
  }

  setTutor(tutor: any) {
    console.log('hi')
    this.tutor = tutor
    this.tutorService.setTutor(tutor);
  }

  getTutors() {
    this.tutorService.getTutors().subscribe((response: any) => {
      this.p = response.tutor;
      
      for (const key in this.p) {
        if (this.p.hasOwnProperty(key)) {
          this.pArray.push(this.p[key]);
        }
      }
    });

  }
}
