import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, updatePassword, User, reauthenticateWithCredential, EmailAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  oobCode: string = ''; // Hier wird der OOB-Code aus der URL extrahiert.

  constructor(private route: ActivatedRoute, private auth: Auth, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.newPassword = params['newPassword'] || ''; // Extrahiert das neue Passwort aus der URL
      this.confirmPassword = params['confirmPassword'] || ''; // Extrahiert die Passwortbestätigung aus der URL
      this.oobCode = params['oobCode'] || ''; // Extrahiert den OOB-Code aus der URL
    });
  }

  async changePassword() {
    if (this.oobCode && this.newPassword && this.confirmPassword) {
      try {
        const user: User | null = this.auth.currentUser;
        if (user) {
          const email = user.email; // Annahme: Sie verwenden die E-Mail-Authentifizierung
          let password: string = 'password'; // Annahme: Hier sollte das aktuelle Passwort des Benutzers stehen
          password = password as string; // Hier wird 'password' explizit als Zeichenfolge deklariert

          const credential = EmailAuthProvider.credential(email as string, password);
          await reauthenticateWithCredential(user, credential);

          await updatePassword(user, this.newPassword);
          console.log('Passwort wurde erfolgreich geändert und in der Datenbank aktualisiert.');
          this.router.navigate(['/login']); // Annahme: Weiterleitung zur Erfolgseite
        } else {
          console.error('Benutzer ist nicht angemeldet.');
        }
      } catch (error) {
        console.error('Fehler bei der Passwortänderung:', error);
      }
    } else {
      console.error('Ungültige Daten für die Passwortänderung.');
    }
  }
}
