import { Component, Output, EventEmitter } from '@angular/core';
import { Admin } from 'src/app/shared/interfaces/admin'
import { AdminService } from 'src/app/shared/services/admin.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  p: Admin[]= [];
  pArray: any[] = [];
  admin: Admin = {
    name: '',
    password: '',
    telefono: '',
    email: ''
  }
  id = '';

  constructor(private adminService: AdminService) {
    this.getAdmins();
  }

  @Output() onSelectedAdmin: EventEmitter<any> = new EventEmitter();

  getAdminById(item: any) {
    this.onSelectedAdmin.emit(item)
    //console.log(item._id)
    this.id = item._id;
    this.admin = item
    this.adminService.setAdmin(item);
    this.adminService.getAdmin();
  }

  setAdmin(admin: any) {
    this.admin = admin
    this.adminService.setAdmin(admin);
  }

  getAdmins() {
    this.adminService.getAdmins().subscribe((response: any) => {
      this.p = response.administrador;
      console.log(this.p)
      for (const key in this.p) {
        if (this.p.hasOwnProperty(key)) {
          this.pArray.push(this.p[key]);
        }
      }
    });

  }

}
