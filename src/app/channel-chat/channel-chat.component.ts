import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChannelService } from '../channel.service';
import { SharedService } from '../services/shared.service';
import { Channels } from 'src/models/channels.class';


@Component({
  selector: 'app-channel-chat',
  templateUrl: './channel-chat.component.html',
  styleUrls: ['./channel-chat.component.scss']
})
export class ChannelChatComponent implements OnInit {
  newMessage: string = '';
  selectedChannel: string = '';

  constructor(private channelService: ChannelService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.channelService.selectedChannel$.subscribe((channelId) => {
      this.selectedChannel = channelId;
    });
  }

  @Output() activateThreadEvent: EventEmitter<void> = new EventEmitter<void>();

  passActivateThreadEvent(event: void) {
    this.activateThreadEvent.emit();
  }

  onChannelSelected(channel: string): void {
    this.sharedService.setSelectedChannel(channel);
  }

  sendMessage() {
    if (this.newMessage !== '') {
      const message = new Channels({
        message: this.newMessage,
        timestamp: 0,
        userSend: '',
        emoji_confirm: 0,
        emoji_handsUp: 0,
        emoji_rocked: 0,
        emoji_smile: 0,
        uid: '', 
      });
      console.log(message);
      // Store the message inside the channel obj under messages

    } else {
      console.log('message was empty');
    }
    this.newMessage = '';
  }
}
