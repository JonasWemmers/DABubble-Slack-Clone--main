import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  onSnapshot,
  updateDoc,
  setDoc,
  arrayUnion,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Accounts } from 'src/models/accounts.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  accounts: Accounts[] = [];
  firestore: Firestore = inject(Firestore);

  constructor() { }

  getAccountsRef() {
    return collection(this.firestore, 'accounts');
  }

  getRef(ColID: string) {
    return collection(this.firestore, ColID);
  }

  getSingelDocRef(ColID: string, DocID: string) {
    return doc(collection(this.firestore, ColID), DocID);
  }

  async addElementFDB(ColID: string, item: {}) {
    await addDoc(this.getRef(ColID), item)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef?.id);
      });
  }

  async updateElementFDB(ColID: string, DocID: string, item: {}) {
    await updateDoc(this.getSingelDocRef(ColID, DocID), item);
  }

  async deleteElementFDB(ColID: string, DocID: string) {
    await deleteDoc(this.getSingelDocRef(ColID, DocID)).catch((err) => {
      console.error(err);
    });
  }

  async getMessagesChannels(colID: string) {
    let querySnapshot = getDocs(this.getRef(colID));
    let channelMessages: any = [];
    (await querySnapshot).forEach((element: any) => {
      console.log('Elementdata are: ', element.data(), ' with ID: ', element.id);
      channelMessages.push(element.data())
    });

    return channelMessages;
  }

  async getSubColDocs(ColID: string, DocID: string, SubColID: string) {
    const querySnapshot = await getDocs(
      collection(this.firestore, ColID, DocID, SubColID)
    );
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  }

  /**
 * 
 * @param colId collection-id
 * @param docId document-id
 * @param item item, that should be added to Array
 * 
 * This function gets the reference of a single document inside the firestore,
 * than adds the item into the existing array messages
 * 
 * !!Still needs some rework, that it not only pushes the item into the messages Array, insted of that, into a variable value!!
 */
  async updateSingleDocElement(colId: string, docId: string, item: {}) {
    updateDoc(this.getSingelDocRef(colId, docId), {
      messages: arrayUnion(item)
    });
  }
}
