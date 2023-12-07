import { Injectable, OnDestroy } from '@angular/core';
import { ChannelService } from './channel.service';
import { FirebaseService } from './firebase.service';
import { Message } from 'src/models/message.class';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { UserService } from './user.service';
import { Accounts } from 'src/models/accounts.class';
import { AuthService } from './auth.service';
import { DirectMessage } from 'src/models/directmessage.class';


@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnDestroy {
  currentMessage = new BehaviorSubject<Message[]>([]);
  currentMessageObservable$ = this.currentMessage.asObservable();
  isThreadOpen = new Subject<boolean>();
  isThreadOpen$ = this.isThreadOpen.asObservable();
  directChatActive = new Subject<boolean>();
  directChatActive$ = this.directChatActive.asObservable();
  channelChatActive = new Subject<boolean>();
  channelChatActive$ = this.channelChatActive.asObservable();
  currentChatPartner = new Subject<string>();
  currentChatPartner$ = this.currentChatPartner.asObservable();
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


  getChatPartnerMessages(chatPartnerId: any) {
    const activeUser = this.user[0];
    const chatPartnerMessages = activeUser.directMessages[chatPartnerId];
    if (chatPartnerMessages !== undefined) {
        return chatPartnerMessages
    } else {
      return [];
    }
  }

  setDirectChatPartner(userId: any) {
    this.currentChatPartner.next(userId);
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

  openThread() {
    this.isThreadOpen.next(true);
  }

  closeThread() {
    this.isThreadOpen.next(false);
  }

  openChannelChat() {
    this.channelChatActive.next(true);
  }

  closeChannelChat() {
    this.channelChatActive.next(false);
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
