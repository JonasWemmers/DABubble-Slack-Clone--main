import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { Accounts } from 'src/models/accounts.class';
import { DirectMessage } from 'src/models/directmessage.class';

@Component({
  selector: 'app-direct-chat',
  templateUrl: './direct-chat.component.html',
  styleUrls: ['./direct-chat.component.scss']
})
export class DirectChatComponent {
  chatPartnerId: string = '';
  chatPartnerSubscription: Subscription;
  currentUserSubscription: Subscription;
  currentUser: Accounts[] = [];
  newDirectMessage: string = '';


  constructor(private messageService: MessageService, public userService: UserService) {
    this.chatPartnerSubscription = this.messageService.currentChatPartner$.subscribe((currentChatPartner) => {
      this.chatPartnerId = currentChatPartner;
      console.log(this.chatPartnerId);
    });

    this.currentUserSubscription = this.userService.currentUserObservable$.subscribe((currentUser) => {
      this.currentUser = currentUser;
      console.log(this.currentUser);
    });
  }



  sendMessage() {
    if (this.newDirectMessage !== '') {
      const date = new Date().getTime();
      const message = new DirectMessage({
        receiverId: this.messageService.currentChatPartner, //still undefined
        timestamp: date,
        message: this.newDirectMessage,
        senderId: this.currentUser[0].uid,
        emojis: [],
      })
      this.messageService.addDirectMessage(this.currentUser[0].uid, message);
      this.newDirectMessage = '';
    } else {
      console.log('Message was empty');
      
    }
  }
}
