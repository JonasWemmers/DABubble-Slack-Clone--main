import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(this.auth, provider);
  }

  registerWithEmailAndPassword(user: { name: string, email: string, passwort: string }) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.passwort);
  }

  signInWithEmailAndPassword(user: { name: string, email: string, passwort: string }) {
    return signInWithEmailAndPassword(this.auth, user.email, user.passwort);
  }
}
