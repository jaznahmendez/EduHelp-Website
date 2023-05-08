import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { HomeComponent } from 'src/app/pages/home/home.component'
import { TutorService } from 'src/app/shared/services/tutor.service';
import { ProfessionalService } from 'src/app/shared/services/professional.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { RegisterService } from 'src/app/shared/services/register.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent{
  
  logged: boolean = false;
  userId: string = ''

  constructor(
    private registerService: RegisterService,
    private tutorService: TutorService, private profService: ProfessionalService, private patientService: PatientService,
    private tokenService: TokenService, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private socialAuthService: SocialAuthService)
  {
    this.tokenService.authStatus.subscribe((status: boolean) => {
      //console.log(status)
      this.logged = status;
    })

    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      
      if(user){
        this.loginService.login(user.idToken, this.loginService.userType).subscribe(response => {
          this.tokenService.setToken(response.token)
          this.router.navigate([this.loginService.userType , 'profile', this.userId])
        })
    
        if(this.loginService.userType == 'tutor')
        {
          console.log('tutor profile')
          this.tutorService.getTutors().subscribe((response: any) => {
            //console.log(user)
            let p = response.tutor;
            for (const key in p) {
              if (p.hasOwnProperty(key)) {
                console.log(p[key])
                console.log(user.email)
                if(p[key].email == user.email){
                  //console.log(p[key]._id)
                  this.userId = p[key]._id
                  console.log(this.userId)
                  this.loginService.setUserId(p[key]._id)
                  
                }
              }
            }
            let tutor = { login: true }
            //console.log(this.userId)
            this.tutorService.updateTutor(tutor, this.userId);
            this.router.navigate([this.loginService.userType , 'profile', this.userId])
          });       
        }
        else if(this.loginService.userType == 'professional')
        {
          console.log('professional profile')
          this.profService.getProfessionals().subscribe((response: any) => {
            //console.log(user)
            let p = response.professional;
            for (const key in p) {
              if (p.hasOwnProperty(key)) {
                //console.log(p[key])
                //console.log(user.email)
                if(p[key].email == user.email){
                  this.userId = p[key]._id
                  this.loginService.setUserId(p[key]._id)
                  
                }
              }
            }
            let prof = { login: true }
            //console.log(this.userId)
            this.profService.updateProfessional(prof, this.userId);
            this.router.navigate([this.loginService.userType , 'profile', this.userId])
          });       
        }
        else if(this.loginService.userType == 'patient')
        {
          console.log('patient profile')
          this.patientService.getPatients().subscribe((response: any) => {
            //console.log(user)
            let p = response.patient;
            for (const key in p) {
              if (p.hasOwnProperty(key)) {
                if(p[key].email == user.email){
                  this.userId = p[key]._id
                  this.loginService.setUserId(p[key]._id)
                  console.log(p[key])
                  console.log(this.userId)
                }
              }
            }
            let prof = { login: true }
            //console.log(this.userId)
            this.patientService.updatePatient(prof, this.userId);
            this.router.navigate([this.loginService.userType , 'profile', this.userId])
          });       
        }
      }
    });
  }

  logOut() {
    let temp = { login: false }
    //console.log(this.userId)
    this.tutorService.updateTutor(temp, this.loginService.userId);
    this.tokenService.deleteToken();
    this.router.navigate(['/']);
  }

}
