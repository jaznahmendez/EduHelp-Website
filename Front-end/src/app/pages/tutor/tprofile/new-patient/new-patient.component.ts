import {Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Patient } from 'src/app/shared/interfaces/patient'

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent {

  hide = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(FormBuilder: FormBuilder, public dialogRef: MatDialogRef<NewPatientComponent>, @Inject(MAT_DIALOG_DATA) public data: Patient) {
    this.firstFormGroup = FormBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required]
    });

    this.secondFormGroup = FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.thirdFormGroup = FormBuilder.group({
      tutorDescription: ['']
    });

  }

  createPatient(){
    let newPatient = {
      name: this.firstFormGroup.value.name,
      tutorId: '641e47725ad83e88452cd701',
      email: this.secondFormGroup.value.email,
      password: this.secondFormGroup.value.password,
      age: this.firstFormGroup.value.age,
      gender: this.firstFormGroup.value.gender,
      tutorDescription: this.thirdFormGroup.value.tutorDescription
    }
    console.log(newPatient);
    window.location.reload()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
