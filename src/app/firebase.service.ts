import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);

  constructor() { }

  getRef(ColID: string) {
    return collection(this.firestore, ColID);
  }

  getSingelDocRef(ColID: string, DocID: string) {
    return doc(collection(this.firestore, ColID), DocID)
  }

  subList(ColID: string) {
    return onSnapshot(this.getRef(ColID), (list) => {
      list.forEach(element => {
        console.log(element.data());
      })
    })
  }

  // Hinzufügen eines neuen Elements. Hierfür wird die Collection ID benötigt
  // und das Objekt als JSON welches hinzugefügt werden soll. Sollte die ColID noch nicht vergeben sein,
  // wird eine neue Collection angelegt.
  async addElementFDB(ColID: string, item: {}) {
    await addDoc(this.getRef(ColID), item).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => { console.log('Document written with ID: ', docRef?.id) }
    )
  }

  // Ändern eines Eintrags in der FirebaseDB. Benötigt wird die CollectionID (ID der Sammlung), 
  // die DocumentID (ID des zu ändernden Dokuments) und das Item als JSON welches hinzugefügt werden soll.
  async updateElementFDB(ColID: string, DocID: string, item: {}) {
    await updateDoc(this.getSingelDocRef(ColID, DocID), item);
  }

  // Löschen eines Eintrags in der FirebaseDB. Benötigt wird die CollectionID (ID der Sammlung) 
  // und die DocumentID (ID des zu Löschenden Dokuments).
  async deleteElementFDB(ColID: string, DocID: string) {
    await deleteDoc(this.getSingelDocRef(ColID, DocID)).catch(
      (err) => { console.error(err); }
    )
  }



  async getSubColDocs(ColID: string, DocID: string, SubColID: string) {
    const querySnapshot = await getDocs(collection(this.firestore, ColID, DocID, SubColID));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    })
  }
}