import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Router } from '@angular/router'; // Import für die Navigation hinzugefügt
import { FirebaseService } from 'src/app/services/firebase.service';
import { Accounts } from 'src/models/accounts.class';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.scss']
})
export class SelectAvatarComponent implements OnInit {
  avatarIDs: string[] = ['avatar', 'avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5'];
  selectedAvatar: string = '';
  docId: string = '';
  userName: string = '';
  userEmail: string = ''; // E-Mail hinzugefügt
  password: string = ''; // Passwort hinzugefügt
  

  constructor(private route: ActivatedRoute, private router: Router, private firebaseService: FirebaseService) {
    this.router = router;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const docId = params.get('docId') || params.get('uid');
      if (docId !== null) {
        this.docId = docId;
      }

      const name = params.get('name');
      if (name !== null) {
        this.userName = name;
      }

      const email = params.get('email');
      if (email !== null) {
        this.userEmail = email;
      }
    });
  }



  async selectAvatar(avatarID: string) {
    let docId;
    this.route.paramMap.subscribe((params) => {
      docId = params.get('docId') || params.get('uid');
    })
    if (docId && avatarID) {
      //const userDocRef = this.firebaseService.getSingelDocRef('accounts', this.docId);
      const data = new Accounts({
        profilepicture: avatarID,
        name: this.userName,
        email: this.userEmail,
        password: this.password,
        uid: this.docId,
        channel: [],
        directMessages: {},
      });
      // Aktualisieren des vorhandenen Benutzerdokuments mit den erforderlichen Informationen
      await this.firebaseService.updateElementFDB('accounts', this.docId, data.toJSON()).then(() => {
        setTimeout(() => {
          this.router.navigateByUrl('dashboard');
        }, 500);
        console.log('Benutzerinformationen erfolgreich in Firestore gespeichert')
      }).catch((error) => {
        console.log('Fehler beim Speichern der Benutzerinformationen in Firestore:', error);
      });


      //  setDoc(userDocRef, {
      //    profilpicture: this.selectedAvatar,
      //    name: this.userName,
      //    email: this.userEmail,
      //    password: this.password, // Passwort hinzugefügt
      //  }, { merge: true })
      //    .then(() => {
      //      console.log('Benutzerinformationen erfolgreich in Firestore gespeichert');

      //     // Führe die Weiterleitung mit einer leichten Verzögerung durch
      //     setTimeout(() => {
      //       // Nachdem die Informationen erfolgreich gespeichert wurden, auf das Dashboard weiterleiten
      //       this.router.navigateByUrl('dashboard');
      //     }, 500); // Hier kannst du die Verzögerung nach Bedarf anpassen
      //   })
      //   .catch((error) => {
      //     console.error('Fehler beim Speichern der Benutzerinformationen in Firestore:', error);
      //   });
    }
  }
}
