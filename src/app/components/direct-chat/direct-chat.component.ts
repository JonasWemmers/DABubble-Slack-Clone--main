import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-direct-chat',
  templateUrl: './direct-chat.component.html',
  styleUrls: ['./direct-chat.component.scss']
})
export class DirectChatComponent {
  chatPartnerId: string = '';
  chatPartnerSubscription: Subscription;


  constructor(private messageService: MessageService, public userService: UserService) {
    this.chatPartnerSubscription = this.messageService.currentChatPartner$.subscribe((currentChatPartner) => {
      this.chatPartnerId = currentChatPartner;
      console.log(this.chatPartnerId);
    });
  }
}
