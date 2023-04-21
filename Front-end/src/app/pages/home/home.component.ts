import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  panelOpenState = false;
  tutorString = "tutor";
  profString = "professional";

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;

  isLinear = false;
  hide = true;
  

  constructor(FormBuilder: FormBuilder){
    console.log('hi')
    this.firstFormGroup = FormBuilder.group({
      name: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.secondFormGroup = FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.thirdFormGroup = FormBuilder.group({
      name: ['', Validators.required],
      profession: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.forthFormGroup = FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });

  }

  fontStyleControl = "no";

  fontStyle?: string;
  
  

  crearUsuario (){
    console.log(this.firstFormGroup);
    console.log(this.secondFormGroup);
  }
}
