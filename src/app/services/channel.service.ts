import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { collection, doc, Firestore, getDocs, query } from '@angular/fire/firestore';
import { Channel } from '../../models/channel.class';
//import { FirebaseService } from './firebase.service';
//import { SharedService } from './shared.service';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { FirebaseService } from './firebase.service'; // Aktualisieren Sie den Pfad entsprechend Ihrer Struktur

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  channels: Channel[] = [];
  currentChannelId!: string;
  channelsLoaded: boolean = false;

  constructor(public firestore: Firestore, private firebaseService: FirebaseService) {
    //this.loadChannels();
  }

  /**
   * Channel-Service Tasks:
   * @Var: Holds current Channel-ID and available Channels
   * 
   * @functions: 
   * 1. Add Channel to Firebase.
   * 2. Delete Channel from Firebase
   * 3. (Realtime updates the Channels)
   * 4. Search Channel (with #)
   * 5. User Management (add user or delete them from the Channel)
   * 6. Update Channel Information
   * 
   */


  getCurrentChannelId() {
    if (this.currentChannelId == undefined) {
      this.currentChannelId = this.channels[0]['id'];
    }
    console.log(this.currentChannelId);
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
      this.getCurrentChannelId();
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






  /**
   * Alte Funktionalitaeten, peu a peu umbauen 
   */


  private selectedChannelSubject = new BehaviorSubject<string>('');
  selectedChannel$: Observable<string> = this.selectedChannelSubject.asObservable();

  setSelectedChannel(channelId: string): void {
    this.selectedChannelSubject.next(channelId);
  }

  channelSelected: EventEmitter<Channel> = new EventEmitter<Channel>();

  addChannel(channel: Channel): void {
    this.channels.push(channel);
  }
}
