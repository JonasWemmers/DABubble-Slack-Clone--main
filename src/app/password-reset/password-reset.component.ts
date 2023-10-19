import { Component } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  email: string = '';

  constructor(private auth: Auth) { }

  resetPassword() {
    sendPasswordResetEmail(this.auth, this.email)
      .then(() => {
        // Erfolgreiche Nachricht an den Benutzer anzeigen
        console.log('Passwort-Zurücksetzungs-E-Mail wurde gesendet.');
      })
      .catch((error: any) => {
        console.error('Ein Fehler ist aufgetreten:', error);
      });
  }
}
