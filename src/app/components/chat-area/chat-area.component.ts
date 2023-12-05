import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { Channel } from 'src/models/channel.class';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { SharedService } from 'src/app/services/shared.service';
import { Message } from 'src/models/message.class';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnDestroy, OnInit {
  channel: Channel[] = [];
  formattedDate!: string;
  channelSubscription: Subscription;


  constructor(private channelService: ChannelService, private messageService: MessageService, public sharedService: SharedService, public userService: UserService) {
    this.channelSubscription = this.channelService.channelObservable$.subscribe((currentChannel) => {
      this.channel = currentChannel;
    });
  }


  async ngOnInit() {
    this.channel = [];
    try {
      await this.channelService.loadChannels();
      await this.channelService.setCurrentChannelId();
    } catch (error) {
      console.error('Error initializing component:', error);
    }
  }

  ngOnDestroy(): void {
    this.channelSubscription.unsubscribe();
  }

  answerMessage(message: Message) {
    this.messageService.setSelectedMessage([message]);
    this.messageService.openThread();
  }

  updateEmoji(message: any, emojiType: string) {

  }

}
