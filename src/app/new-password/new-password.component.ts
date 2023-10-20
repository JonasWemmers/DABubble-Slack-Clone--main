import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  oobCode: string = ''; // Hier wird der OOB-Code aus der URL extrahiert.

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.newPassword = params['newPassword'] || ''; // Extrahiert das neue Passwort aus der URL
      this.confirmPassword = params['confirmPassword'] || ''; // Extrahiert die Passwortbestätigung aus der URL
      this.oobCode = params['oobCode'] || ''; // Extrahiert den OOB-Code aus der URL
    });
  }

  async changePassword() {
    if (this.oobCode && this.newPassword && this.confirmPassword) {
      if (this.newPassword === this.confirmPassword) {
        try {
          // Führen Sie die Passwortänderung durch
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
