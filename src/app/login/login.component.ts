import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitClicked: boolean = false; // Neues Flag für die Überprüfung

  constructor(private auth: Auth, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((res: any) => {
        this.router.navigateByUrl('dashboard');
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  loginWithEmailPassword() {
    this.isSubmitClicked = true; // Setzen des Flags, wenn auf "Anmelden" geklickt wird

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      if (email && password) {
        signInWithEmailAndPassword(this.auth, email, password)
          .then((res: any) => {
            this.router.navigateByUrl('dashboard');
          })
          .catch((error: any) => {
            console.error(error);
          });
      }
    }
  }
}
