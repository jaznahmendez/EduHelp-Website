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
  apiUrl: string = 'http://localhost:3000/'

  upload(input: HTMLInputElement): Observable<any>{
    const formData = new FormData();
    formData.append('file', input.files![0]);
    console.log(formData.get('file'))
    const url = this.apiUrl +  'tutor/upload/' + this.loginService.getUserId();
    console.log(url)

    //console.log(formData)
    return this.httpClient.post<any>(url, formData);
  }

 /* getFiles(): string {
    const url = this.apiUrl + this.loginService.getUserType() + '/uploads/' + this.loginService.getUserId();
    const photo = this.httpClient.get<string[0]>(url).subscribe();
    return photo;
  }*/
}
