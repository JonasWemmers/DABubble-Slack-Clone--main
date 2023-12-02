import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect } from '@angular/fire/auth';
import { getAuth } from "firebase/auth";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private userService: UserService) { }

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

  async getCurrentUser() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log(user?.uid);
      await this.userService.setCurrentUser(user?.uid);
    } else {
      console.log('No user signed in');
    }
  }

}
