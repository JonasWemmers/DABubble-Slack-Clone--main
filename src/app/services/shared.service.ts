import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private channelsLoadedSubject = new BehaviorSubject<boolean>(false);
  channelsLoaded$ = this.channelsLoadedSubject.asObservable();
  currentChannelId:string = '';

  setChannelsLoaded(loaded: boolean) {
    this.channelsLoadedSubject.next(loaded);
  }

  private selectedChannelSubject = new BehaviorSubject<string | undefined>(undefined);
  selectedChannel$: Observable<string | undefined> = this.selectedChannelSubject.asObservable();

  setSelectedChannel(channel: string): void {
    console.log('setSelectedChannel called with channel:', channel);
    this.selectedChannelSubject.next(channel);
  }
}