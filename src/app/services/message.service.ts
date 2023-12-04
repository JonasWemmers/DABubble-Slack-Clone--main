import { Injectable, OnDestroy } from '@angular/core';
import { ChannelService } from './channel.service';
import { FirebaseService } from './firebase.service';
import { Message } from 'src/models/message.class';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { UserService } from './user.service';
import { Accounts } from 'src/models/accounts.class';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnDestroy {
  currentMessage = new BehaviorSubject<Message[]>([]);
  currentMessageObservable$ = this.currentMessage.asObservable();
  isThreadOpen = new Subject<boolean>();
  isThreadOpen$ = this.isThreadOpen.asObservable();
  directChatActive = new Subject<boolean>();
  directChatActive$ = this.directChatActive.asObservable()
  userSubscription: Subscription;
  user: Accounts[] = [];

  constructor(private channelService: ChannelService, private firebaseService: FirebaseService, private userService: UserService, private authService: AuthService) { 
    this.userSubscription = this.userService.currentUserObservable$.subscribe((currentUser) => {
      this.user = currentUser;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  

  setSelectedMessage(message: Message | Message[]) {
    const messageArray = Array.isArray(message) ? message : [message]
    this.currentMessage.next(messageArray);
  }

  openDirectChat() {
    this.directChatActive.next(true);
  }

  closeDirectChat() {
    this.directChatActive.next(false);
  }

  setCurrentThread() {
    this.isThreadOpen.next(true);
  }

  closeThread() {
    this.isThreadOpen.next(false);
  }

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



  async addMessageToChannel(newMessage: string) {
    try {
      if (!this.user || this.user.length === 0) {
        await this.authService.getCurrentUser();
      }
      const date = new Date().getTime();
      console.log('Active user that sent this message:', this.user);
      console.log(this.user[0].uid);
      
      const message = new Message({
        message: newMessage,
        timestamp: date,
        userSend: this.user[0].uid,
        emojisByUser: {},
        uid: '',
        answers: []
      });
      console.log(message, this.channelService.currentChannelId);
      await this.firebaseService.updateSingleDocElement('channelList', this.channelService.currentChannelId, message.toJSON());
      this.channelService.setCurrentChannel();
    } catch (error) {
      console.error('Error adding message to channel:', error);
    }
  }
}
