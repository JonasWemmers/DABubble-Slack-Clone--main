import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  async registerWithEmailAndPassword() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;

      // Wenn die Registrierung erfolgreich ist, können Sie den Benutzer hier weiterleiten oder andere Aktionen durchführen.
      this.router.navigateByUrl('dashboard');

      // Hier fügen wir die Benutzerdaten zu Firestore unter der Sammlung "Accounts" hinzu
      const firestore = getFirestore();
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        uid: user.uid, // Hinzufügen der Nutzer-UID als Feld
      };

      const docRef = await addDoc(collection(firestore, 'accounts'), userData);
      console.log('Benutzerdaten erfolgreich zu Firestore hinzugefügt mit ID:', docRef.id);
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Benutzerdaten zu Firestore:', error);
    }
  }
}
