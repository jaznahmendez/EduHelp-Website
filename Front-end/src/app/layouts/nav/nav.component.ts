import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { HomeComponent } from 'src/app/pages/home/home.component'
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

  constructor(
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
        console.log('Usuario de Google ', user)
        //console.log(user.idToken)
        
        this.loginService.login(user.idToken, this.loginService.userType).subscribe(response => {
          this.tokenService.setToken(response.token)
          
          if(this.loginService.userType == 'tutor'){
            let p = []
            console.log('tutor profile')
            this.tutorService.getTutors().subscribe((response: any) => {
              p = response.tutor;
              for (const key in p) {
                if (p.hasOwnProperty(key)) {
                  //console.log(p[key])
                  //console.log(user.email)
                  if(p[key].email == user.email){
                    //console.log(p[key]._id)
                    this.userId = p[key]._id
                    //console.log(this.userId)
                  }
                }
              }
              let tutor = { login: true }
              this.tutorService.updateTutor(tutor, this.userId);
              this.router.navigate([this.loginService.userType , 'profile', this.userId])
            });            
          } 
          else if(this.loginService.userType == 'professional')
          {
            let p = []
            console.log('professional profile')
            this.profService.getProfessionals().subscribe((response: any) => {
              p = response.professional;
              for (const key in p) {
                if (p.hasOwnProperty(key)) {
                  if(p[key].email == user.email) this.userId = p[key]._id
                }
              }
              let prof = { login: true }
              this.profService.updateProfessional(prof, this.userId);
              this.router.navigate([this.loginService.userType , 'profile', this.userId])
            });

          }
          else if(this.loginService.userType == 'patient')
          {
            let p = []
            console.log('patient profile')
            this.patientService.getPatients().subscribe((response: any) => {
              p = response.patient;
              for (const key in p) {
                if (p.hasOwnProperty(key)) {
                  if(p[key].email == user.email) this.userId = p[key]._id
                }
              }
              let patient = { login: true }
              this.patientService.updatePatient(patient, this.userId);
              this.router.navigate([this.loginService.userType , 'profile', this.userId])
            });

          }
          
          //console.log('userId', this.userId)
          //let url = '/' + this.loginService.userType + '/profile/' + this.userId
          //console.log(this.loginService.userType , '/profile/', this.userId)
          //this.router.navigate([this.loginService.userType , 'profile', this.userId])
        })
      } 
    });

  }

  logOut() {
    
    if(this.loginService.userType == 'tutor')
    {
      let tutor = { login: false }
      this.tutorService.updateTutor(tutor, this.userId);
    } 
    else if(this.loginService.userType == 'professional')
    {
      let prof = { login: false }
      this.profService.updateProfessional(prof, this.userId);
    }
    else if(this.loginService.userType == 'patient')
    {
      let patient = { login: false }
      this.patientService.updatePatient(patient, this.userId);
    }

    this.tokenService.deleteToken();
    this.router.navigate(['/']);
  }

}
