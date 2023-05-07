import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userType = ''
  userId = ''

  constructor(private httpClient: HttpClient) { }

  login(idToken: string, userType: string): Observable<any> {
    return this.httpClient.post('http://localhost:3000/login/' + userType, { googleToken: idToken});
  }

}
