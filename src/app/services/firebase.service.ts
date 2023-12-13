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
  orderBy,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Accounts } from 'src/models/accounts.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);

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


  // async getDirectMessageFromUser(userId: string) {
  //   console.log('Function started with UserId:', userId);
  //   try {
  //     console.log('Started query');
  //     const q = query(this.getRef('directChat'), where('senderId', '==', userId) || where('receiverId', '==', userId), orderBy('timestamp', 'asc'));
  //     console.log('finished query --> started getDocs', q);
  //     const querySnapshot = await getDocs(q);
  //     console.log('finished query snapshot', querySnapshot);
  //     if (querySnapshot.empty) {
  //       console.log('No matching documents.');
  //     } else {
  //       const messagesByChatPartner = new Map();
  //       querySnapshot.forEach((doc) => {
  //         const chatPartnerId = doc.get('senderId') === userId ? doc.get('receiverId') : doc.get('senderId');
  //         if (!messagesByChatPartner.has(chatPartnerId)) {
  //           messagesByChatPartner.set(chatPartnerId, []);
  //         }
  //         messagesByChatPartner.get(chatPartnerId).push({
  //           messageId: doc.id,
  //           data: doc.data(),
  //         });
  //       });
  //       messagesByChatPartner.forEach((messages, chatPartnerId) => {
  //         console.log(`Messages with ${chatPartnerId}:`);
  //         messages.forEach((message: { messageId: string, data: any }) => {
  //           console.log(message.messageId, '==>', message.data);
  //         });
  //       });
  //       console.log(messagesByChatPartner);
  //     } 
  //   } catch (err) {
  //     console.log('Error in getDirectMessageFromUser:', err);
  //   } 
  // }

}
