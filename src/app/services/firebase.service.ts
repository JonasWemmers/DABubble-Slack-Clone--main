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
  query,
  where,
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

  async addElementFDBReturnDocRef(ColID: string, item: {}) {
    const docRef = await addDoc(this.getRef(ColID), item);
    return docRef.id;
  }

  async updateElementFDB(ColID: string, DocID: string, item: {}) {
    await updateDoc(this.getSingelDocRef(ColID, DocID), item);
  }

  async deleteElementFDB(ColID: string, DocID: string) {
    await deleteDoc(this.getSingelDocRef(ColID, DocID)).catch((err) => {
      console.error(err);
    });
  }

  //Still usefull or should be rewritten? Doesnt return anything, just loggs the data
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


  /**
   * 
   * @param colID collection-id
   * @returns The collection, can then be transformed into the data to work with it.
   */
  async collectionSnapshot(colID: string) {
    const q = query(this.getRef(colID));
    return getDocs(q);
  }

  async documentSnapshot(colID: string, docID: string) {
    const docRef = this.getSingelDocRef(colID, docID);
    return getDoc(docRef);
  }

  /**
   * 
   * @param colID collection ID
   * @param param1 first search param
   * @param param2 second search param
   * 
   * 
   */
  queryCollection(colID: string, param1: string, param2: string) {
    const ref = this.getRef(colID);
    const q = query(ref, where(param1, '==', param2));
    return getDocs(q);
  }

}
