import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl: string = 'http://localhost:3000/'
  constructor(private httpClient: HttpClient) { }

  createAdmin(admin: object)
  {
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
      headers: headers
    }
    this.httpClient.post<any>(this.apiUrl + 'admin', admin, options).subscribe();
  }

  createProfessional(professional: object)
  {
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
      headers: headers
    }
    this.httpClient.post<any>(this.apiUrl + 'professional', professional, options).subscribe();
  }

  createPatient(patient: object)
  {
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
      headers: headers
    }
    this.httpClient.post<any>(this.apiUrl + 'admin/patient', patient, options).subscribe();
  }

  createTutor(tutor: object)
  {
    //console.log('here ', tutor)
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
      headers: headers
    }
    let url = this.apiUrl + 'admin/tutor'
    //console.log(url)
    //console.log(tutor, options)
    this.httpClient.post<any>(url, tutor, options).subscribe();
  }

}
