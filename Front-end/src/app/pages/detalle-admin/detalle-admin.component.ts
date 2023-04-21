import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/shared/interfaces/admin'
import { AdminService } from 'src/app/shared/services/admin.service'

@Component({
  selector: 'app-detalle-admin',
  templateUrl: './detalle-admin.component.html',
  styleUrls: ['./detalle-admin.component.scss']
})
export class DetalleAdminComponent implements OnInit {
  admin: any = {
    name: '',
    password: '',
    telefono: ''
  }

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAdmin().subscribe((response: any) => {
      this.admin = response
    });
   
  }

}
