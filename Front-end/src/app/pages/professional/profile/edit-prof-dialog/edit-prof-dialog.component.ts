import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Professional } from 'src/app/shared/interfaces/professional';

@Component({
  selector: 'app-edit-prof-dialog',
  templateUrl: './edit-prof-dialog.component.html',
  styleUrls: ['./edit-prof-dialog.component.scss']
})
export class EditProfDialogComponent {
  constructor( public dialogRef: MatDialogRef<EditProfDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Professional) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
