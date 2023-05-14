import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Admin } from 'src/app/shared/interfaces/admin';
import { RegisterService } from 'src/app/shared/services/register.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent {
  constructor(private registerService: RegisterService, FormBuilder: FormBuilder, public dialogRef: MatDialogRef<EditAdminComponent>, @Inject(MAT_DIALOG_DATA) public data: Admin) { }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
