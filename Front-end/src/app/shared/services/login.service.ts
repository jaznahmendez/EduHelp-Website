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
  
  login(idToken: string, userType: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
      headers: headers
    }
    return this.httpClient.post('http://localhost:3000/login/' + userType, { googleToken: idToken}, options);
  }

}
