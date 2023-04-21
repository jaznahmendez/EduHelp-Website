import { Injectable } from '@angular/core';
import { Patient } from 'src/app/shared/interfaces/patient'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patientSeleccionado: any = {
    name: '',
    email: '',
    password: '',
    tutorId: ''
  }
  apiUrl: string = 'http://localhost:3000/'
  id: string = ''

  constructor(private httpClient: HttpClient) { }

  getPatients() {
    return this.httpClient.get(this.apiUrl + 'admin/patient')
  }

  setPatient(item: any) {
    this.id = item._id;
    this.patientSeleccionado = item;
  }

  setPatientProfile(id: string)
  {
    this.id = id;
    let url = this.apiUrl + 'admin/patient/' + id
    this.httpClient.get(url).subscribe((response: any) => {
      //console.log(url)
      //console.log(response)
      this.patientSeleccionado = response
    });
    console.log(this.patientSeleccionado)
  }

  getPatient() {
    //console.log('id: ', this.id)
    let url = this.apiUrl + 'admin/patient/' + this.id
    //console.log(url)
    return this.httpClient.get(url)
  }

  updatePatient(patient: object, id: string)
  {
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
      headers: headers
    }
    return this.httpClient.put(this.apiUrl + 'admin/patient/:id' + id, patient, options)
  }

  deletePatient(id: string)
  {
    return this.httpClient.delete(this.apiUrl + 'admin/patient/' + id)
  }
}
