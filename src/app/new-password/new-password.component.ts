import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, updatePassword, User, EmailAuthProvider } from '@angular/fire/auth';

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
    if (this.oobCode && this.newPassword && this.confirmPassword) {
      try {
        // Stellen Sie sicher, dass der Benutzer angemeldet ist
        const user: User | null = this.auth.currentUser;

        if (user) {
          // Ändern Sie das Passwort
          await updatePassword(user, this.newPassword);
          console.log('Passwort wurde erfolgreich geändert und in der Datenbank aktualisiert.');
          this.router.navigate(['/login']);
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
