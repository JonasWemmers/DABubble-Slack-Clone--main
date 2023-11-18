import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { SharedService } from '../../services/shared.service';
import { Message } from 'src/models/message.class';
import { FirebaseService } from '../../services/firebase.service';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-channel-chat',
  templateUrl: './channel-chat.component.html',
  styleUrls: ['./channel-chat.component.scss']
})
export class ChannelChatComponent implements OnInit {
  newMessage: string = '';
  selectedChannel: string = '';
  selectedChannelId: string = '';

  constructor(private channelService: ChannelService,
    private sharedService: SharedService, private firebaseService: FirebaseService, private firestore: Firestore) { }

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
      const date = new Date().getTime();
      const message = new Message({
        message: this.newMessage,
        timestamp: date,
        userSend: '',  // Get user(id), that sended the Message
        emoji_confirm: 0,
        emoji_handsUp: 0,
        emoji_rocked: 0,
        emoji_smile: 0,
      });
      console.log(message);
      this.addMessageToChannel(message);
    } else {
      console.log('message was empty');
    }
    this.newMessage = '';
  }

  addMessageToChannel(message: any) {
   this.firebaseService.updateSingleDocElement('channelList', this.sharedService.currentChannelId, message.toJSON())
  }

}
