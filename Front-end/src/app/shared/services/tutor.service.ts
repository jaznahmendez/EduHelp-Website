import { Injectable } from '@angular/core';
import { Tutor } from 'src/app/shared/interfaces/tutor'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  tutorSeleccionado: Tutor = {
    name: '',
    email: '',
    password: '',
    telefono: ''
  }
  apiUrl: string = 'http://localhost:3000/'
  id: string = ''

  constructor(private httpClient: HttpClient) { }

  getTutors() {
    return this.httpClient.get(this.apiUrl + 'admin/tutor')
  }

  setTutor(item: any) {
    this.id = item._id;
    this.tutorSeleccionado = item;
  }

  getPatients() {
    let url = this.apiUrl + 'tutor/patient/all/' + this.id
    console.log(url)
    return this.httpClient.get(url)
  }

  getTutor() {
    //console.log('id: ', this.id)
    let url = this.apiUrl + 'admin/tutor/' + this.id
    console.log(url)
    return this.httpClient.get(url)
  }

  updateTutor(tutor: object, id: string)
  {
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
      headers: headers
    }
    return this.httpClient.put(this.apiUrl + 'tutor/:id' + id, tutor, options)
  }

  deleteTutor(id: string)
  {
    return this.httpClient.delete(this.apiUrl + 'admin/tutor/' + id)
  }

}
