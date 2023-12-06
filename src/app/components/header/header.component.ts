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
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';


interface MyUserType {
  name: string;
  email: string;
  profilepicture: string[];
  // ... andere Eigenschaften ...
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
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
    private channelService: ChannelService,
    private userService: UserService,
    private messageService: MessageService) {
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
            this.avatarIDs = snapshot.data().profilepicture;
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


  // For Testing
  searchActive: boolean = false;
  searchUser: boolean = false;
  searchChannel: boolean = false;
  searchedChannels: Channel[] = [];
  searchedUsers: Accounts[] = [];

  onSearch() {
    const channels: Channel[] = this.channelService.channels;
    const users: Accounts[] = this.userService.users;
    this.searchUser = false;
    this.searchChannel = false;
    this.searchActive = false;
    if (this.searchTerm.charAt(0) === '#') {
      this.searchActive = true;
      this.searchChannel = true;
      const searchTermWithoutHash = this.searchTerm.substring(1).toLowerCase();
      const filteredChannels = channels.filter(channel =>
        channel.name.toLowerCase().startsWith(searchTermWithoutHash)
      );
      console.log('Channels matching the search term:', filteredChannels);
      this.searchedChannels = filteredChannels;
      console.log('Searched Channel var:', this.searchedChannels);

    }

    if (this.searchTerm.charAt(0) === '@') {
      this.searchActive = true;
      this.searchUser = true;
      const searchTermWithoutAt = this.searchTerm.substring(1).toLowerCase();
      const filteredUsers = users.filter(user =>
        user && user.name && user.name.toLowerCase().startsWith(searchTermWithoutAt)
      );
      console.log('Users matching the search term:', filteredUsers);
      this.searchedUsers = filteredUsers;
      console.log('Searched User var:', this.searchedUsers);
    }
  }

  async openChat(userId: string) {
    this.searchActive = false;
    this.searchTerm = '';
    this.messageService.openDirectChat();
    this.messageService.setDirectChatPartner(userId);
  }

  openChannel(channelId: string, channelName: string) {
    this.searchActive = false;
    this.searchTerm = '';
    this.channelService.currentChannelId = channelId;
    this.channelService.setSelectedChannel(channelName)
    this.channelService.setCurrentChannel();
    this.messageService.closeThread();
    this.messageService.closeDirectChat();
    this.messageService.openChannelChat();
  }
}
