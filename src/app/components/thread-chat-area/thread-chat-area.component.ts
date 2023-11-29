import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';
import { MessageService } from 'src/app/services/message.service';
import { SharedService } from 'src/app/services/shared.service';
import { Subscription } from 'rxjs';
import { Message } from 'src/models/message.class';

@Component({
  selector: 'app-thread-chat-area',
  templateUrl: './thread-chat-area.component.html',
  styleUrls: ['./thread-chat-area.component.scss']
})
export class ThreadChatAreaComponent implements OnInit, OnDestroy {
  currentMessage: Message[] = [];
  messageSubscription: Subscription;

  constructor(private messageService: MessageService, private channelService: ChannelService, public sharedService: SharedService) {
    this.messageSubscription = this.messageService.currentMessageObservable$.subscribe((currentMessage) => {
    this.currentMessage = currentMessage;
  });
}

ngOnInit(): void {

}

ngOnDestroy(): void {
  this.messageSubscription.unsubscribe();
}

openEmojiList() {
    
}

}
