import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Admin } from 'src/app/shared/interfaces/admin'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminSeleccionado: Admin = {
    name: '',
    password: '',
    telefono: '',
    email: ''
  }
  apiUrl: string = 'https://eduhelp-api.onrender.com/'
  id: string = ''

  constructor(private httpClient: HttpClient) { }

  getAdmins() {
    return this.httpClient.get(this.apiUrl + 'admin')
  }

  setAdmin(item: any) {
    this.id = item._id;
    this.adminSeleccionado = item;
  }

  setAdminProfile(id: string)
  {
    this.id = id;
    let url = this.apiUrl + 'admin/' + id
    this.httpClient.get(url).subscribe((response: any) => {
      //console.log(url)
      //console.log(response)
      this.adminSeleccionado = response
    });
  }

  getAdmin() {
    //console.log('id: ', this.id)
    let url = this.apiUrl + 'admin/' + this.id
    console.log(url)
    return this.httpClient.get(url)
  }

  updateAdmin(admin: object, id: string)
  {
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
      headers: headers
    }
    return this.httpClient.put(this.apiUrl + 'admin/' + id, admin, options).subscribe()
  }

  deleteAdmin(id: string)
  {
    return this.httpClient.delete(this.apiUrl + 'admin/' + id)
  }

}
