import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  userDocId: string = ''; // Variable zur Speicherung der docRef.id (hier die uid)
  profilepicture: string = ''

  constructor(
    private auth: Auth,
    private router: Router,
    private authService: AuthService,
  ) {}

  async registerWithEmailAndPassword() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;

      const firestore = getFirestore();

      // Verwende die uid des Benutzers als userDocId
      this.userDocId = user.uid;

      const userDocRef = doc(firestore, 'accounts', this.userDocId);
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        uid: user.uid,
        profilepicture: this.profilepicture,
      };

      // Setze die Benutzerdaten in das Dokument mit der uid als DocId
      await setDoc(userDocRef, userData);

      // Weiterleitung zur SelectAvatarComponent und Übergabe der uid als DocId
      this.router.navigate(['/select-avatar', { docId: this.userDocId, name: this.name, email: this.email}]);
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Benutzerdaten zu Firestore:', error);
    }
  }
}
