import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { collection, doc, Firestore, getDocs, query } from 'firebase/firestore';
import { Channel } from '../models/channel.class';
import { getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private channels: Channel[] = [];
  private firestore: Firestore;

  constructor() {
    this.firestore = getFirestore();
    this.getChannelsFromFirebase();
  }

  private selectedChannelSubject = new BehaviorSubject<string>('');
  selectedChannel$: Observable<string> = this.selectedChannelSubject.asObservable();

  setSelectedChannel(channelId: string): void {
    this.selectedChannelSubject.next(channelId);
  }

  private async getChannelsFromFirebase(): Promise<void> {
    const channelsQuery = query(collection(this.firestore, 'channelList'));
  
    try {
      const querySnapshot = await getDocs(channelsQuery);
  
      querySnapshot.forEach((doc) => {
        const channelData = doc.data();
        const channel:Channel = new Channel(channelData);
        channel.id = doc.id;
        this.channels.push(channel);
      });
    } catch (error) {
      console.error('Error fetching channels from Firebase:', error);
    }
  }

  getChannels(): Observable<Channel[]> {
    return new Observable<Channel[]>((observer) => {
      observer.next(this.channels);
    });
  }

  addChannel(channel: Channel): void {
    this.channels.push(channel);
    // Hier könntest du ggf. die Daten auch in Firebase speichern
  }
}
