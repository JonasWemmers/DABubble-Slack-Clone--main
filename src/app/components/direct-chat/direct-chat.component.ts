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



  async sendMessage() {
    if (this.newDirectMessage !== '') {
      if (this.chatPartnerId) {
        const date = new Date().getTime();
        console.log('ChatPartnerId: ', this.chatPartnerId);
        const tempReceiverId = String(this.chatPartnerId);
        console.log('TempReceiverId:', tempReceiverId);  
        const message = new DirectMessage({
          receiverId: tempReceiverId,
          timestamp: date,
          message: this.newDirectMessage,
          senderId: this.currentUser[0].uid,
          emojis: [],
        });
        this.messageService.addDirectMessage(tempReceiverId, message);
        this.newDirectMessage = '';
      } else {
        console.log('chatPartner id is undefined');
      }
    } else {
      console.log('Message was empty');
    }
  }
}
