import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { User, getAuth, onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { getFirestore, doc, getDoc, DocumentSnapshot } from 'firebase/firestore';
import { Subject, Subscription } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

interface MyUserType {
  name: string;
  email: string;
  profilpicture: string[];
  // ... andere Eigenschaften ...
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  first_menu_edit: boolean = false;
  pb_edit_menu: boolean = false;
  second_menu: boolean = false;
  avatarIDs: string[] = ['avatar', 'avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5'];
  docId: string = '';
  userName: string = '';
  userEmail: string = '';
  password: string = '';

  private destroy$ = new Subject<void>();
  private authSubscription: Unsubscribe | undefined;

  constructor(public dialog: MatDialog, private authService: Auth, private firestore: Firestore) {}



  ngOnInit() {
    this.authSubscription = this.authService.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const uid = firebaseUser.uid;
        const firestore = getFirestore();
  
        // Nehmen Sie an, dass die UID als benutzerdefinierte ID in der 'accounts'-Sammlung verwendet wird
        const userDocumentReference = doc(firestore, 'accounts', uid);
  
        const userDocSnap = getDoc(userDocumentReference) as Promise<DocumentSnapshot<MyUserType>>;
  
        userDocSnap.then(snapshot => {
          if (snapshot.exists()) {
            this.docId = snapshot.id; // Das ist die Dokumenten-ID
            this.userName = snapshot.data().name;
            this.userEmail = snapshot.data().email;
            this.avatarIDs = snapshot.data().profilpicture;
            // ... andere Eigenschaften ...
            console.log(this.userName, this.userEmail, this.avatarIDs); // Hier sollte der Wert vorhanden sein
          } else {
            console.log('Benutzerdaten existieren nicht.');
          }
        }).catch(error => {
          console.error('Fehler beim Abrufen von Benutzerdaten:', error);
        });
      }
    });
  }
  

    /*
      .subscribe({
        next: (user: User | null) => {
          if (user) {
            const uid = user.uid;
            const firestore = getFirestore();
            const userDocumentReference = doc(firestore, 'accounts', uid);
            const userDocSnap = getDoc(userDocumentReference) as Promise<DocumentSnapshot<MyUserType>>;

            userDocSnap.then(snapshot => {
              if (snapshot.exists()) {
                this.docId = snapshot.id;
                this.userName = snapshot.data().name;
                this.userEmail = snapshot.data().email;
                this.avatarIDs = snapshot.data().profilpicture;
                // ... andere Eigenschaften ...
              }
            });
          }
        },
        error: (error: any) => console.error('Error in onAuthStateChanged:', error),
        complete: () => console.log('onAuthStateChanged completed'),
        unsubscribe: () => this.destroy$.next() // Unsubscribe, wenn destroy$ das nächste Mal ausgelöst wird
      });
  }
*/


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.authSubscription) {
      this.authSubscription();
    }
  }

  openMenu() {
    this.second_menu = false;
    this.pb_edit_menu = false;
    this.first_menu_edit = !this.first_menu_edit;
  }

  openProfile() {
    this.first_menu_edit = false;
    this.second_menu = true;
  }

  openEditMenu() {
    this.first_menu_edit = false;
    this.second_menu = false;
    this.pb_edit_menu = true;
  }

  saveUserData() {
    // Hier könntest du die Änderungen speichern, wenn notwendig.
    // Beispiel: this.authService.updateUserProfile(this.userName, this.userEmail);
    
    this.first_menu_edit = false;
    this.second_menu = false;
    this.pb_edit_menu = false;
  }
}
