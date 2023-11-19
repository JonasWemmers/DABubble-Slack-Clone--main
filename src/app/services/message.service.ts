import { Injectable } from '@angular/core';
import { ChannelService } from './channel.service';
import { FirebaseService } from './firebase.service';
import { Channel } from 'src/models/channel.class';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  channel: Channel[] = [];


  constructor(private channelService: ChannelService, private firebaseService: FirebaseService) {}

  /**
   * Tasks:
   * 
   * Add Message to Channel
   * Message User
   * Answer Message to Userquestion
   * Edit Message
   * Render Messages
   * 
   * 
   * 
   */

  async loadChannel() {
    this.channel = [];
    const docSnap = await this.firebaseService.documentSnapshot('channelList', this.channelService.currentChannelId);
    this.channel.push(docSnap.data() as Channel);
    console.log(this.channel);
  }



  addMessageToUser() {}
  addMessageToChannel() {}
  answerMessageChannel() {}
  answerMessageUser() {}
}
