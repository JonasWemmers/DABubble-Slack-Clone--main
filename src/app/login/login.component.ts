import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import für Firestore hinzugefügt

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitClicked: boolean = false;
  userDocId: string = ''; // Deklaration von userDocId
  userEmail: string = ''; // E-Mail hinzugefügt

  constructor(private auth: Auth, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then(async (result) => {
        const user = result.user;
        this.userDocId = user.uid; // Speichern Sie die uid als userDocId
        if (user.email) {
          this.userEmail = user.email; // Extrahieren Sie die Google-E-Mail-Adresse, wenn sie vorhanden ist
        }

        // Hier wird die uid und die E-Mail-Adresse in Firestore gespeichert
        const firestore = getFirestore();
        const userDocRef = doc(firestore, 'accounts', this.userDocId);
        await setDoc(userDocRef, { uid: this.userDocId, email: this.userEmail }, { merge: true });

        this.router.navigate(['/select-avatar', { uid: user.uid, name: user.displayName, docId: this.userDocId, email: this.userEmail }]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loginWithEmailPassword() {
    this.isSubmitClicked = true;

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      if (email && password) {
        signInWithEmailAndPassword(this.auth, email, password)
          .then((res: any) => {
            this.router.navigateByUrl('dashboard');
          })
          .catch((error: any) => {
            console.error(error);
          });
      }
    }
  }
}
