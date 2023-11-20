import { Injectable, EventEmitter, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
//import { collection, doc, Firestore, getDocs, query } from 'firebase/firestore';
import { Channel } from '../../models/channel.class';
//import { getFirestore } from 'firebase/firestore';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { FirebaseService } from './firebase.service'; // Aktualisieren Sie den Pfad entsprechend Ihrer Struktur

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  selectedChannelSubject = new BehaviorSubject<string>('');
  selectedChannel$: Observable<string> = this.selectedChannelSubject.asObservable();
  channelSelected: EventEmitter<Channel> = new EventEmitter<Channel>();
  channels: Channel[] = [];
  currentChannelId!: string;
  channelsLoaded: boolean = false;
  //private firestore: Firestore;

  constructor(private firebaseService: FirebaseService) {
    //this.loadChannels();
  }

  async setCurrentChannelId() {
    if (this.currentChannelId == undefined) {
      this.currentChannelId = this.channels[0]['id'];
    }
    console.log('Current Channel id is:', this.currentChannelId);
  }

  /**
   * This function gets the querySnapshot from the firebase component.
   * Then it sends the snapshot-data to the processChannels()-function.
   * After that is done, it sorts the Channels by name.
   */
  async loadChannels() {
    try {
      const querySnapshot = await this.firebaseService.collectionSnapshot('channelList');
      this.channels = this.processChannels(querySnapshot);
      this.channels.sort((a, b) => a.name.localeCompare(b.name));
      this.setCurrentChannelId();
    } catch (error) {
      console.log('Error fetching channel data:', error);
    }
  }

  /**
   * 
   * @param querySnapshot querySnapshot from the firebase database
   * @returns all avaiable channels
   * 
   * Takes the querySnapshot gets the data from the snapShot, the data get set inside the channelData
   * and gets pushed inside the channels-array
   */
  private processChannels(querySnapshot: QuerySnapshot<DocumentData>): Channel[] {
    const channels: Channel[] = [];
    querySnapshot.forEach((doc) => {
      const channelData = doc.data() as Channel;
      channels.push(channelData);
    });
    return channels;
  }


  setSelectedChannel(channelId: string): void {
    this.selectedChannelSubject.next(channelId);
  }


  async addChannel(channel: Channel) {
    try {
      const docID = await this.firebaseService.addElementFDBReturnDocRef('channelList', channel.toJSON());
      channel.id = docID;
      // User create noch hinzufuegen
      this.firebaseService.updateElementFDB('channelList', docID, channel.toJSON());
      this.loadChannels();
    } catch (err) {
      console.log(err);
    }
  }

  //  console.log(channel);
  //  const querySnapshot = await this.firebaseService.queryCollection('channelList', 'name', 'Allgemein');
  //  querySnapshot.forEach((doc) => {
  //   const channelData = doc.data() as Channel;
  //   console.log(channelData);
  //  })   


}

