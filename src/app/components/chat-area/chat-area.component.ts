import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { Channel } from 'src/models/channel.class';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { SharedService } from 'src/app/services/shared.service';




@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnDestroy, OnInit {

  channel: Channel[] = [];
  formattedDate!: string;
  channelSubscription: Subscription;

  constructor(private channelService: ChannelService, private messageService: MessageService, public sharedService: SharedService) {
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

  answerMessage(message: any) {
    this.messageService.currentMessage = message;
    //Open Thread with that message
  }

  addEmoji(message: any, emoji:string) {
    console.log(message);
    console.log(emoji);
  }

}
