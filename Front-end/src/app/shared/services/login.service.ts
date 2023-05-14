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
    this.userType = user;
  }

  setUserId(id: string)
  {
    this.userId = id
  }

  setUserEmail(email: string)
  {
    this.userEmail = email
  }
  
  login(idToken: string, userType: string): Observable<any> {
    return this.httpClient.post('http://localhost:3000/login/' + userType, { googleToken: idToken});
  }

  

}
