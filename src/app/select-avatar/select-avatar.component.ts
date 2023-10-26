import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.scss']
})
export class SelectAvatarComponent implements OnInit {
  avatarIDs: string[] = ['avatar', 'avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5'];
  selectedAvatar: string = '';
  docId: string = ''; // Variable zur Speicherung der docRef.id
  userName: string = ''; // Hier wird der Name des Benutzers gespeichert

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const docId = params.get('docId');
      if (docId !== null) {
        this.docId = docId;
      }

      const name = params.get('name');
      if (name !== null) {
        this.userName = name; // Hier wird der Name gesetzt
      }
    });
  }

  selectAvatar(avatarID: string) {
    this.selectedAvatar = avatarID;

    if (this.docId && this.selectedAvatar) {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'accounts', this.docId);

      // Aktualisiere das vorhandene Benutzerdokument mit dem 'profilpicture'-Feld
      setDoc(userDocRef, { profilpicture: this.selectedAvatar }, { merge: true })
        .then(() => {
          console.log('Avatar-ID erfolgreich in Firestore gespeichert');
        })
        .catch((error) => {
          console.error('Fehler beim Speichern der Avatar-ID in Firestore:', error);
        });
    }
  }
}
