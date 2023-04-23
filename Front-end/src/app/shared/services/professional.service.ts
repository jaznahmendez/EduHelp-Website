import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Professional } from 'src/app/shared/interfaces/professional'

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  professionalSeleccionado: any = {
    name: '',
    email: '',
    password: '',
    telefono: ''
  }
  apiUrl: string = 'http://localhost:3000/'
  id: string = ''

  constructor(private httpClient: HttpClient) { }

  getProfessionals() {
    return this.httpClient.get(this.apiUrl + 'professional')
  }

  setProfessional(item: any) {
    this.id = item._id;
    this.professionalSeleccionado = item;
  }

  setProfessionalProfile(id: string)
  {
    this.id = id;
    let url = this.apiUrl + 'professional/' + id
    this.httpClient.get(url).subscribe((response: any) => {
      //console.log(url)
      //console.log(response)
      this.professionalSeleccionado = response
    });
  }

  getProfessional() {
    //console.log('id: ', this.id)
    return this.httpClient.get(this.apiUrl + 'professional/' + this.id);
  }

  updateProfessional(prof: object, id: string)
  {
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
      headers: headers
    }
    return this.httpClient.put(this.apiUrl + 'professional/' + id, prof, options).subscribe()
  }

  deleteProfessional(id: string)
  {
    return this.httpClient.delete(this.apiUrl + 'professional/' + id)
  }

}
