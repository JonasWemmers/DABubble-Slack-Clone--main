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
  userDocId: string = ''; // Variable zur Speicherung der docRef.id

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  async registerWithEmailAndPassword() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;

      const firestore = getFirestore();
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        uid: user.uid, // Hinzufügen der Nutzer-UID als Feld
      };

      const docRef = await addDoc(collection(firestore, 'accounts'), userData);
      
      // Speichere die docRef.id in der Variable
      this.userDocId = docRef.id;

      // Weiterleitung zur SelectAvatarComponent und Übergabe der docRef.id
      this.router.navigate(['/select-avatar', { docId: this.userDocId, name: this.name }]);
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Benutzerdaten zu Firestore:', error);
    }
  }
}
