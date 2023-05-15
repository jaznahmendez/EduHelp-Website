import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userType = ''
  userId = ''
  userEmail = ''

  constructor(private httpClient: HttpClient) { }

  setUserType(user: string)
  {
    localStorage.setItem('userType', user);
  }

  setUserId(id: string)
  {
    //this.userId = id
    console.log('saving to storage', id)
    localStorage.setItem('userId', id);
  }

  getUserId(): string {
    //console.log('from storage',localStorage.getItem('userId'))
    return localStorage.getItem('userId') || '';
  }

  getUserType(): string {
    return localStorage.getItem('userType') || '';
  }

  getTutorId(): string {
    return localStorage.getItem('tutorId') || '';
  }


  setTutorId(id: string) {
    localStorage.setItem('tutorId', id);
  }

  setUserEmail(email: string)
  {
    this.userEmail = email
  }
  
  login(idToken: string, userType: string): Observable<any> {
    return this.httpClient.post('http://localhost:3000/login/' + userType, { googleToken: idToken});
  }

    loginPatient(idToken: string, tutorId: string): Observable<any> {
      return this.httpClient.post('http://localhost:3000/login/patient/' + tutorId, { googleToken: idToken});
    }

}
