import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: Auth, private router: Router){}

  loginWithGoogle(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((res: any) => {
        this.router.navigateByUrl('dashboard');
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
