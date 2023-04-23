import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/shared/interfaces/admin'
import { AdminService } from 'src/app/shared/services/admin.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aprofile',
  templateUrl: './aprofile.component.html',
  styleUrls: ['./aprofile.component.scss']
})
export class AProfileComponent implements OnInit {
  admin: any = {}
  id: string = ''

  constructor(private route: ActivatedRoute, private adminService: AdminService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.adminService.setAdminProfile(this.id)
    this.adminService.getAdmin().subscribe((response: any) => {
      this.admin = response
    });
  }

  updateAdmin(id: string, obj: any) {
    this.adminService.updateAdmin(obj, id);
  }

  changeAdminPassword(id: string, password: string){
    this.adminService.id = id;
    this.adminService.getAdmin().subscribe((response: any) => {
        response.password = password;
        this.adminService.updateAdmin(response, id);
      
    });
  }

  deleteAdmin(id: string) {
    this.adminService.deleteAdmin(id);
  }
}
