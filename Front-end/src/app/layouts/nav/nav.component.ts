import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  
  logged: boolean = false;

  constructor(private tokenService: TokenService, private router: Router, private loginService: LoginService)
  {
    this.tokenService.authStatus.subscribe((status: boolean) => {
      this.logged = status;
    })
  }

  logOut() {
    this.tokenService.deleteToken();
    this.router.navigate(['/login']);
  }

}
