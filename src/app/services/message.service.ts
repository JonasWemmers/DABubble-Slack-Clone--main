import { Injectable } from '@angular/core';
import { ChannelService } from './channel.service';
import { FirebaseService } from './firebase.service';
import { Channel } from 'src/models/channel.class';
import { Message } from 'src/models/message.class';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  channel: Channel[] = [];


  constructor(private channelService: ChannelService, private firebaseService: FirebaseService) { }

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



  addMessageToUser() { }

  answerMessageChannel() { }
  answerMessageUser() { }




  async addMessageToChannel(newMessage: string) {
    if (newMessage !== '') {
      const date = new Date().getTime();
      const message = new Message({
        message: newMessage,
        timestamp: date,
        userSend: '',  // Get user(id), that sended the Message
        emoji_confirm: 0,
        emoji_handsUp: 0,
        emoji_rocked: 0,
        emoji_smile: 0,
        answers: []
      });
      console.log(message, this.channelService.currentChannelId);
      await this.firebaseService.updateSingleDocElement('channelList', this.channelService.currentChannelId, message.toJSON());
    } else {
      console.log('message was empty');
    }
  }

}
