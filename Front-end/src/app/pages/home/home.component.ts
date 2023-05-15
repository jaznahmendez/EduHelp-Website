import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { RegisterService } from 'src/app/shared/services/register.service'
import { TokenService } from 'src/app/shared/services/token.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  panelOpenState = false;
  tutorString = "tutor";
  profString = "professional";
  patientString = "patient";

  userState = '';

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  thirdFormGroup: FormGroup;
  LoginForm: FormGroup;

  isLinear = false;
  hide = true;

  routerL = ''
  userType: string = ''
  //this.LoginForm.value.user 

  constructor(private loginService: LoginService, FormBuilder: FormBuilder, private registerService: RegisterService, private tokenService: TokenService, private router: Router){
    //console.log('hi')
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
    });

  }

  fontStyleControl = "no";

  fontStyle?: string;
  
  user = { };
  

  credenciales: any = { email: '', password: '' };

  setUser(user: string){
    this.loginService.setUserType(user)
    this.loginService.userType = user;
    this.userType = user;
    //console.log(user);
    //console.log(this.user)
  }
  
  login(){
    /*this.loginService.setUserType(this.userType)
    console.log(this.LoginForm.value.user);
    this.loginService.userType = this.userType  */
  }
}

/*
 crearUsuario (){
    if(this.fontStyleControl == "tutor"){
      this.user = {
        name: this.firstFormGroup.value.name,
        email: this.secondFormGroup.value.email,
        password: this.secondFormGroup.value.password,
        telefono: this.firstFormGroup.value.telefono    
      }
      //console.log(this.user)
      this.registerService.createTutor(this.user)
      this.routerL = '/tutor/profile/641e47725ad83e88452cd701'
    }else{
      this.user = {
        name: this.thirdFormGroup.value.name,
        profession: this.thirdFormGroup.value.profession,
        email: this.secondFormGroup.value.email,
        password: this.secondFormGroup.value.password,
        telefono: this.thirdFormGroup.value.telefono    
      }
      this.registerService.createProfessional(this.user)
      this.routerL = '/professional/profile/641e3aa760a550973418d30e'
    }
    //console.log(this.user)
    //console.log(typeof(this.user))
  }
*/
