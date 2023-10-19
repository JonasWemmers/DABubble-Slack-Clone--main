import { Component } from '@angular/core';
import { Auth, confirmPasswordReset } from '@angular/fire/auth';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = ''; // Fügen Sie die confirmPassword-Variable hinzu
  oobCode: string = ''; // Hier sollten Sie den OOB-Code aus dem Link in der E-Mail einfügen.

  constructor(private auth: Auth) { }

  async changePassword() {
    if (this.oobCode && this.newPassword && this.confirmPassword) { // Überprüfen Sie die confirmPassword-Variable
      if (this.newPassword === this.confirmPassword) {
        try {
          await confirmPasswordReset(this.auth, this.oobCode, this.newPassword);

          console.log('Passwort wurde erfolgreich geändert und in der Datenbank aktualisiert.');
        } catch (error) {
          console.error('Fehler bei der Passwortänderung:', error);
        }
      } else {
        console.error('Die neuen Passwörter stimmen nicht überein.');
      }
    } else {
      console.error('Ungültige Daten für die Passwortänderung.');
    }
  }
}
