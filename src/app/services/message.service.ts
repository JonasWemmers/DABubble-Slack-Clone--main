import { Injectable } from '@angular/core';
import { ChannelService } from './channel.service';
import { FirebaseService } from './firebase.service';
import { Message } from 'src/models/message.class';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  currentMessage = new BehaviorSubject<Message[]>([]);
  currentMessageObservable$ = this.currentMessage.asObservable();
  isThreadOpen = new Subject<boolean>();
  isThreadOpen$ = this.isThreadOpen.asObservable();

  constructor(private channelService: ChannelService, private firebaseService: FirebaseService) { }
  


  setSelectedMessage(message: any) {
    this.currentMessage.next(message);
  }

  setCurrentThread() {
    this.isThreadOpen.next(true);
  }

  closeThread() {
    this.isThreadOpen.next(false);
  }




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



  addMessageToUser() { }
  answerMessageChannel() { }
  answerMessageUser() { }



  updateEmoji(message: Message, emojiType: string) {


    // Doenst work, because i don't know, can take a string as emojiType, but no var with a string?

    // const userId = '198171293719823'
    // if (!message.emojisByUser[userId]) {
    //   message.emojisByUser[userId] = { confirm: 0, handsUp: 0, rocket: 0, nerd: 0 };
    // }

    // if (message.emojisByUser[userId][emojiType] > 0) {
    //   message.emojisByUser[userId][emojiType]--;
    // } else {
    //   message.emojisByUser[userId][emojiType]++;
    // }
    // //Update that message -> update Channel on Server
    // console.log(message);
  }



  /**
   * AddMessage to Channel and Add Answer could be the same function,
   * just for developing purposes two seperate functions right now,
   * refactorying later
   */

  async addMessageToChannel(newMessage: string) {
    if (newMessage !== '') {
      const date = new Date().getTime();
      const message = new Message({
        message: newMessage,
        timestamp: date,
        userSend: '',  // Get user(id), that sended the Message
        emojisByUser: {},
        id: '',
        answers: []
      });
      console.log(message, this.channelService.currentChannelId);
      await this.firebaseService.updateSingleDocElement('channelList', this.channelService.currentChannelId, message.toJSON());
      this.channelService.setCurrentChannel();
    } else {
      console.log('message was empty');
    }
  }

  async addAnswerToMessage(newAnswer: string) {
    if (newAnswer !== '') {
      const date = new Date().getTime();
      const answer = new Message({
        message: newAnswer,
        timestamp: date,
        userSend: '',  // Get user(id), that sended the Message
        emojisByUser: {},
        id: '',
        answers: []  // Maybe a new class for Answers, because that is not needed;
      });
      console.log(answer, this.currentMessage);
    }
  }









}
