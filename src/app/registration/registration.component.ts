import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private auth: Auth, private router: Router) {}

  registerWithEmailAndPassword() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential: any) => {
        // Wenn die Registrierung erfolgreich ist, können Sie den Benutzer hier weiterleiten oder andere Aktionen durchführen.
        this.router.navigateByUrl('dashboard');
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
