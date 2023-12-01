import { Injectable } from '@angular/core';
import { Accounts } from 'src/models/accounts.class';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Accounts[] = [];
  currentUser = new BehaviorSubject<Accounts[]>([]);
  currentUserObservable$ = this.currentUser.asObservable();

  constructor() {}

  setActiveUser(user: Accounts): void {
    this.currentUser.next([user]);
  }



}
