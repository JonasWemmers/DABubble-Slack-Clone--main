import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, updatePassword, User, confirmPasswordReset, getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  oobCode: string = '';

  constructor(private route: ActivatedRoute, private auth: Auth, private router: Router) {
    this.oobCode = this.route.snapshot.queryParams['oobCode'] || '';
  }

  async changePassword() {
    if (this.newPassword && this.confirmPassword) {
      try {
        if (this.oobCode) {
          // Stellen Sie sicher, dass der Benutzer angemeldet ist
          const user: User | null = this.auth.currentUser;

          if (user) {
            // Ändern Sie das Passwort mithilfe von confirmPasswordReset
            const auth = getAuth();
            await confirmPasswordReset(auth, this.oobCode, this.newPassword);

            console.log('Passwort wurde erfolgreich geändert.');
            this.router.navigate(['/login']);
          } else {
            console.error('Benutzer ist nicht angemeldet.');
          }
        } else {
          console.error('Ungültiger oder fehlender OOB-Code.');
        }
      } catch (error) {
        console.error('Fehler bei der Passwortänderung:', error);
      }
    } else {
      console.error('Ungültige Daten für die Passwortänderung.');
    }
  }
}
