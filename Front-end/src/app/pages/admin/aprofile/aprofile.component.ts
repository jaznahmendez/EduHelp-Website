import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/shared/interfaces/admin'
import { AdminService } from 'src/app/shared/services/admin.service'
import { ActivatedRoute } from '@angular/router';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/shared/services/register.service';

@Component({
  selector: 'app-aprofile',
  templateUrl: './aprofile.component.html',
  styleUrls: ['./aprofile.component.scss']
})
export class AProfileComponent implements OnInit {
  admin: any = {}
  id: string = ''
  hide = true;
  routeId: string = ''
  firstFormGroup: FormGroup;

  constructor(FormBuilder: FormBuilder,private route: ActivatedRoute, private adminService: AdminService, public dialog: MatDialog, private registerService: RegisterService) {
    this.firstFormGroup = FormBuilder.group({
      name: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(3)]]
    });
  }

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

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditAdminComponent, {
      data: { ...this.admin }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result){
        this.admin = {...result};
        console.log(this.admin)
        this.adminService.updateAdmin(result, this.admin._id);
      }
    });
  }

  createAdmin(){
    console.log(this.firstFormGroup.value)
    this.registerService.createAdmin(this.firstFormGroup.value);
    this.firstFormGroup.reset();
  }
}
