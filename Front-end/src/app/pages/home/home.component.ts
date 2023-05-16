import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { TutorService } from 'src/app/shared/services/tutor.service';


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

  constructor(private tutorService: TutorService,
    private loginService: LoginService, FormBuilder: FormBuilder, private tokenService: TokenService, private router: Router){
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
      tutorId: ['', Validators.required]
    });

    this.userState = this.LoginForm.value.user;
    //console.log(this.LoginForm.value.tutorId)
  }

  fontStyleControl = "no";

  fontStyle?: string;
  
  user = { };
  tutorId = ''

  credenciales: any = { email: '', password: '' };

  setTutorId()
  {
    this.tutorService.getTutors().subscribe((response: any) => {
      this.tutorId = this.LoginForm.value.tutorId
      console.log(this.LoginForm.value.tutorId)
      let p = response.tutor;
      for (const key in p) {
        if(p[key].email == this.tutorId)
        {
          console.log('saving tutorId', p[key]._id)
          this.loginService.setTutorId(p[key]._id)
        }
      }
    });
    
  }

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
