import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/shared/interfaces/patient';

@Component({
  selector: 'app-edit-patient-dialog',
  templateUrl: './edit-patient-dialog.component.html',
  styleUrls: ['./edit-patient-dialog.component.scss']
})
export class EditPatientDialogComponent {
  constructor( public dialogRef: MatDialogRef<EditPatientDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Patient) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

