import { Injectable, EventEmitter, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Channel } from '../../models/channel.class';
import { FirebaseService } from './firebase.service';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  selectedChannelSubject = new BehaviorSubject<string>('');
  selectedChannel$: Observable<string> = this.selectedChannelSubject.asObservable();
  channelSelected: EventEmitter<Channel> = new EventEmitter<Channel>();
  channels: Channel[] = [];
  currentChannelId!: string;

  constructor(private firebaseService: FirebaseService) {}

  async setCurrentChannelId() {
    if (this.currentChannelId == undefined) {
      console.log('Hier muesste noch die ID des ersten Channels ausgelesen werden.');
    }
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


   addChannel(channel: Channel): void {
     this.channels.push(channel);
   }
}
