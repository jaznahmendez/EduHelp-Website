import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { TutorService } from 'src/app/shared/services/tutor.service';
import { ProfessionalService } from 'src/app/shared/services/professional.service';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent{
  
  logged: boolean = false;
  userId: string = ''
  newUser: boolean = true
  routerLink: string = '';
  isTutor: boolean = false;

  constructor(
    private tutorService: TutorService, private profService: ProfessionalService, private patientService: PatientService,
    private tokenService: TokenService, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private socialAuthService: SocialAuthService)
  {
    if(localStorage.getItem('userType') == 'tutor'){
      this.routerLink = '/tutor/profile/' + localStorage.getItem('userId');
      this.isTutor = true;
    }else if(localStorage.getItem('userType') == 'patient'){
      this.routerLink = '/patient/profile/' + localStorage.getItem('userId');
    }else{
      this.routerLink = '/professional/profile/' + localStorage.getItem('userId');
    }

    this.tokenService.authStatus.subscribe((status: boolean) => {
      //console.log(status)
      this.logged = status;
    })

    this.socialAuthService.authState.subscribe((user: SocialUser) => {})

    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      let t = this.loginService.getUserType();
      if(user){
        this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.tokenService.setToken(accessToken));
        console.log(user);
        console.log(user.idToken);
        //this.tokenService.setToken(user.idToken);
        this.loginService.setUserEmail(user.email);
        if(t=='professional' || t=='tutor'){
          this.isTutor = true
          this.loginService.login(user.idToken, this.loginService.getUserType()).subscribe(response => {
            //this.router.navigate([this.loginService.userType , 'profile', this.userId])
            
              this.loginService.setUserId(response._id)
  
              let id = this.loginService.getUserId()
              let type = this.loginService.getUserType();
              this.router.navigate([type , 'profile', id])
             
          })
        } else {
          this.loginService.loginPatient(user.idToken, this.loginService.getTutorId()).subscribe(response => {
            //this.router.navigate([this.loginService.userType , 'profile', this.userId])

              this.loginService.setUserId(response._id)
  
              let id = this.loginService.getUserId()
              let type = this.loginService.getUserType();
              this.router.navigate([type , 'profile', id])
             
          })
        }
        
      }
    });
  }

  logOut() {
    this.tokenService.deleteToken();
    this.router.navigate(['/']);
  }

  goProfile(){
    let id = this.loginService.getUserId();
    let type = this.loginService.getUserType();
    this.router.navigate([type , 'profile', id]);
  }

  displayNotifications(){
    this.router.navigate(['chat']);
  }
}