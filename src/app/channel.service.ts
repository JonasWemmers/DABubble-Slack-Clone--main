import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Channel } from '../models/channel.class';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private channels: Channel[] = [];

  constructor() {
    // Hier könntest du ggf. Daten aus Firebase abrufen und in this.channels speichern
  }

  getChannels(): Observable<Channel[]> {
    return of(this.channels);
  }

  addChannel(channel: Channel): void {
    this.channels.push(channel);
    // Hier könntest du ggf. die Daten auch in Firebase speichern
  }
}