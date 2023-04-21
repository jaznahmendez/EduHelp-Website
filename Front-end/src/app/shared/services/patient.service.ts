import { Injectable } from '@angular/core';
import { Patient } from 'src/app/shared/interfaces/patient'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patientSeleccionado: Patient = {
    name: '',
    email: '',
    password: '',
    tutorId: ''
  }
  apiUrl: string = 'http://localhost:3000/'
  id: string = ''

  constructor(private httpClient: HttpClient) { }

  getPatients() {
    return this.httpClient.get(this.apiUrl + 'patient')
  }

  setPatient(item: any) {
    this.id = item._id;
    this.patientSeleccionado = item;
  }

  getPatient() {
    //console.log('id: ', this.id)
    return this.httpClient.get(this.apiUrl + 'patient/' + this.id);
  }

  updatePatient(patient: object, id: string)
  {
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
      headers: headers
    }
    return this.httpClient.put(this.apiUrl + 'patient/' + id, patient, options)
  }

  deletePatient(id: string)
  {
    return this.httpClient.delete(this.apiUrl + 'patient/' + id)
  }
}
