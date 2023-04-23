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
  LoginForm: FormGroup;

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

    this.LoginForm = FormBuilder.group({
      user: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });

  }

  fontStyleControl = "no";

  fontStyle?: string;
  
  user = { };
  

  crearUsuario (){
    if(this.fontStyleControl == "tutor"){
      this.user = {
        name: this.firstFormGroup.value.name,
        email: this.firstFormGroup.value.email,
        password: this.secondFormGroup.value.password,
        telefono: this.firstFormGroup.value.telefono    
      }
    }else{
      this.user = {
        name: this.thirdFormGroup.value.name,
        profession: this.thirdFormGroup.value.profession,
        email: this.firstFormGroup.value.email,
        password: this.secondFormGroup.value.password,
        telefono: this.thirdFormGroup.value.telefono    
      }
    }
    
  }

  login(){
    if(this.LoginForm.value.user == "professional"){

    }else if(this.LoginForm.value.user == "tutor"){
      
    }else{
      
    }
    //redirigir a ruta hardcodeada
  }
}
