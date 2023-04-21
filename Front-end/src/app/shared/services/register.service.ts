import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl: string = 'http://localhost:3000/'
  constructor(private httpClient: HttpClient) { }

  createProfessional(professional: object)
  {
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
      headers: headers
    }
    return this.httpClient.post(this.apiUrl + 'professional', professional, options);
  }

  createPatient(patient: object)
  {
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
      headers: headers
    }
    return this.httpClient.post(this.apiUrl + 'admin/patient', patient, options);
  }

}
