import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/shared/interfaces/admin'
import { AdminService } from 'src/app/shared/services/admin.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-admin',
  templateUrl: './detalle-admin.component.html',
  styleUrls: ['./detalle-admin.component.scss']
})
export class DetalleAdminComponent implements OnInit {
  admin: any = {
  }
  id: string = ''
  

  constructor(private route: ActivatedRoute, private adminService: AdminService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.adminService.id = this.id

    this.adminService.getAdmin().subscribe((response: any) => {
      this.admin = response
    });
   
  }

}
