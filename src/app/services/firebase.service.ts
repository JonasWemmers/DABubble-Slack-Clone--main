import { Injectable, inject } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Accounts } from 'src/models/accounts.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  accounts: Accounts[] = [];

  firestore: Firestore = inject(Firestore);
  
  constructor() { }

  getAccountsRef(){
    return collection(this.firestore, 'accounts');
  }
}
