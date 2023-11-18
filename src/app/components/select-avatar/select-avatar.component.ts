import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Router } from '@angular/router'; // Import für die Navigation hinzugefügt

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
  private router: Router;

  constructor(private route: ActivatedRoute, router: Router) {
    this.router = router;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const docId = params.get('uid');
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

      // Hier können Sie die E-Mail-Adresse von Google verwenden oder abrufen
      // z.B., wenn die E-Mail in den Parametern nicht verfügbar ist
      // this.userEmail = this.getGoogleUserEmail();
    });
  }

  // Hier können Sie die Logik hinzufügen, um die E-Mail-Adresse von Google abzurufen
  // getGoogleUserEmail() {
  //   // Fügen Sie hier Ihre Logik hinzu, um die E-Mail-Adresse von Google zu erhalten
  // }

  selectAvatar(avatarID: string) {
    this.selectedAvatar = avatarID;

    if (this.docId && this.selectedAvatar) {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'accounts', this.docId);

      // Aktualisieren des vorhandenen Benutzerdokuments mit den erforderlichen Informationen
      setDoc(userDocRef, {
        profilpicture: this.selectedAvatar,
        name: this.userName,
        email: this.userEmail,
        password: this.password, // Passwort hinzugefügt
      }, { merge: true })
        .then(() => {
          console.log('Benutzerinformationen erfolgreich in Firestore gespeichert');
          // Nachdem die Informationen erfolgreich gespeichert wurden, auf das Dashboard weiterleiten
          this.router.navigateByUrl('dashboard');
        })
        .catch((error) => {
          console.error('Fehler beim Speichern der Benutzerinformationen in Firestore:', error);
        });
    }
  }
}
