import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';
import { MessageService } from 'src/app/services/message.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-thread-chat-area',
  templateUrl: './thread-chat-area.component.html',
  styleUrls: ['./thread-chat-area.component.scss']
})
export class ThreadChatAreaComponent implements OnInit, OnDestroy {
  currentMessage: any;

constructor(private messageService: MessageService, private channelService: ChannelService, public sharedService: SharedService) {}

ngOnInit(): void {
  this.currentMessage = this.messageService.currentMessage;
  console.log(this.currentMessage);
  
}

ngOnDestroy(): void {
  
}

  openEmojiList() {
    
  }

}
