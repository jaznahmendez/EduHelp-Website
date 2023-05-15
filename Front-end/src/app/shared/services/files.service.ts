import { Injectable } from '@angular/core';
import { File } from '../interfaces/file';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  upload(input: HTMLInputElement): Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    const options = {
      headers: headers
    }
    
    const formData = new FormData();
    formData.append('file', input.files![0]);
    
    const url = `${environment.apiUrl}/${this.loginService.getUserType()}/upload`;
    console.log(url)

    console.log(formData)
    return this.httpClient.post<any>(url, formData, options);
  }
}
