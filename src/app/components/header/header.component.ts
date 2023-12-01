import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { User, getAuth, onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { getFirestore, doc, getDoc, DocumentSnapshot } from 'firebase/firestore';
import { Subject, Subscription } from 'rxjs';
import { Channel } from 'src/models/channel.class';
import { Firestore } from '@angular/fire/firestore';
import { ChannelService } from 'src/app/services/channel.service';
import { Accounts } from 'src/models/accounts.class';


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
  searchTerm: string = '';
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

  constructor(
    public dialog: MatDialog, 
    private authService: Auth, 
    private cdr: ChangeDetectorRef,
    private channelService: ChannelService) {

  }



  async ngOnInit() {
    this.authSubscription = this.authService.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const uid = firebaseUser.uid;
        const firestore = getFirestore();
  
        // Nehmen Sie an, dass die UID als benutzerdefinierte ID in der 'accounts'-Sammlung verwendet wird
        const userDocumentReference = doc(firestore, 'accounts', uid);
  
        const userDocSnap = getDoc(userDocumentReference) as Promise<DocumentSnapshot<MyUserType>>;
  
        userDocSnap.then(snapshot => {
          if (snapshot.exists()) {
            console.log('SnapshotData:', snapshot.data());

            
            this.docId = snapshot.id; // Das ist die Dokumenten-ID
            this.userName = snapshot.data().name;
            this.userEmail = snapshot.data().email;
            this.avatarIDs = snapshot.data().profilpicture;
            // ... andere Eigenschaften ...
            console.log(this.userName, this.userEmail, this.avatarIDs); // Hier sollte der Wert vorhanden sein

            this.cdr.detectChanges();
          } else {
            console.log('Benutzerdaten existieren nicht.');
          }
        }).catch(error => {
          console.error('Fehler beim Abrufen von Benutzerdaten:', error);
        })
      }
    });
  }


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

  onSearch() {
    const channels: Channel[] = this.channelService.channels;
    //const users: Accounts = 
    if (this.searchTerm.charAt(0) === '#') {
      const searchTermWithoutHash = this.searchTerm.substring(1).toLowerCase();
      const filteredChannels = channels.filter(channel =>
        channel.name.toLowerCase().startsWith(searchTermWithoutHash)
      );
      console.log('Channels matching the search term:', filteredChannels);
    }

    if (this.searchTerm.charAt(0) === '@') {
      const searchTermWithoutHash = this.searchTerm.substring(1).toLowerCase();
      //const filterdUsers;
      //console.log('Users matching the search term:', filterdUsers);
      
    }
  }
}
