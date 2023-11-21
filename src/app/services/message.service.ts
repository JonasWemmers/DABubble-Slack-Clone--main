import { Injectable } from '@angular/core';
import { ChannelService } from './channel.service';
import { FirebaseService } from './firebase.service';
import { Message } from 'src/models/message.class';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

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



  addMessageToUser() {}
  answerMessageChannel() {}
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
