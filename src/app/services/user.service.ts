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


  private processUsers(querySnapshot: QuerySnapshot<DocumentData>): Accounts[] {
    const users: Accounts[] = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data() as Accounts;
      users.push(userData);
    });
    return users;
  }

  setActiveUser(user: Accounts): void {
    this.currentUser.next([user]);
  }



}
