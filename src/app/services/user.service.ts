import { Injectable } from '@angular/core';
import { Accounts } from 'src/models/accounts.class';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Accounts[] = [];
  currentUser = new BehaviorSubject<Accounts[]>([]);
  currentUserObservable$ = this.currentUser.asObservable();

  constructor(private firebaseService: FirebaseService) {
    this.getUsers();
  }


  async getUsers() {
    const querySnapshot = await this.firebaseService.collectionSnapshot('accounts');
    this.users = this.processUsers(querySnapshot);
    console.log(this.users);
  }


  getUserName(uid: string) {
    const user = this.users.find(user => user.uid === uid);
    if (user) {
      return user.name;
    } else {
      return "User not found";
    }
  }

  getUserAvatar(uid: string) {
    const user = this.users.find(user => user.uid === uid);
    if (user) {
      return user.profilepicture;
    } else {
      return 'avatar1';
    }
  }

  private processUsers(querySnapshot: QuerySnapshot<DocumentData>): Accounts[] {
    const users: Accounts[] = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data() as Accounts;
      users.push(userData);
    });
    return users;
  }

  setActiveUser(user: Accounts): void {
    console.log('User to set:', user);
    this.currentUser.next([user]);
    console.log('Updated user:', this.currentUser);
  }

  async setCurrentUser(uid: string) {
    try {
      const docSnap = await this.firebaseService.documentSnapshot('accounts', uid);
      const user = docSnap.data() as Accounts;
      this.setActiveUser(user);
      this.getUsers();
      console.log('Current User set:', this.currentUser);
    } catch (error) {
      console.error('Error setting current channel:', error);
    }
  }

}
