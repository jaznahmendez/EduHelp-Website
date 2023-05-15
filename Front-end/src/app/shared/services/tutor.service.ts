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
  apiUrl: string = 'https://eduhelp-api.onrender.com/'
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

  setTutorProfile(id: string)
  {
    this.id = id;
    let url = this.apiUrl + 'admin/tutor/' + id
    this.httpClient.get(url).subscribe((response: any) => {
      //console.log(url)
      //console.log(response)
      this.tutorSeleccionado = response
    });
  }

  getTutor() {
    //console.log('id: ', this.id)
    let url = this.apiUrl + 'admin/tutor/' + this.id
    //console.log(url)
    return this.httpClient.get(url)
  }

  getTutorById(id: string){
    let url = this.apiUrl + 'admin/tutor/' + id
    //console.log(url)
    return this.httpClient.get(url)
  }

  updateTutor(tutor: object, id: string)
  {
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
      headers: headers
    }
    //console.log(id)
    this.httpClient.put<any>(this.apiUrl + 'tutor/' + id, tutor, options).subscribe()
  }

  deleteTutor(id: string)
  {
    return this.httpClient.delete(this.apiUrl + 'admin/tutor/' + id)
  }

}
