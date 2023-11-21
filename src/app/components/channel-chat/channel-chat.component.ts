import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { FirebaseService } from '../../services/firebase.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-channel-chat',
  templateUrl: './channel-chat.component.html',
  styleUrls: ['./channel-chat.component.scss']
})
export class ChannelChatComponent implements OnInit {
  newMessage: string = '';
  selectedChannel: string = '';
  selectedChannelId: string = '';

  constructor(private channelService: ChannelService, private firebaseService: FirebaseService, private messageService: MessageService) {}

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
    this.channelService.setSelectedChannel(channel);
  }

  sendMessage() {
    this.messageService.addMessageToChannel(this.newMessage).catch((err) => {
      console.log('Coudnt add message to channel', err);
    }).then(() => {
      this.newMessage = '';
    })

  }
}
