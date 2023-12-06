import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MessageService } from 'src/app/services/message.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { Accounts } from 'src/models/accounts.class';

@Component({
  selector: 'app-direct-chat-area',
  templateUrl: './direct-chat-area.component.html',
  styleUrls: ['./direct-chat-area.component.scss']
})
export class DirectChatAreaComponent implements OnDestroy {

  formattedDate!: string;
  chatPartnerId: string = '';
  chatPartnerSubscription: Subscription;
  currentUser: Accounts[] = [];
  currentUserSubscription: Subscription;

  constructor(private messageService: MessageService,
    public sharedService: SharedService,
    private userService: UserService) {
    this.chatPartnerSubscription = this.messageService.currentChatPartner$.subscribe((currentChatPartner) => {
      this.chatPartnerId = currentChatPartner;
      console.log(this.chatPartnerId);
      
    });

    this.currentUserSubscription = this.userService.currentUserObservable$.subscribe((currentUser) => {
      this.currentUser = currentUser;
      console.log(this.currentUser);
    });
  }


  ngOnDestroy(): void {
    this.chatPartnerSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();
  }
}
