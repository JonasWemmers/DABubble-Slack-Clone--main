import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-channel-chat',
  templateUrl: './channel-chat.component.html',
  styleUrls: ['./channel-chat.component.scss']
})
export class ChannelChatComponent implements OnInit {

  selectedChannel: string = '';

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    this.channelService.selectedChannel$.subscribe((channelId) => {
      this.selectedChannel = channelId;
    });
  }

  @Output() activateThreadEvent: EventEmitter<void> = new EventEmitter<void>();

  passActivateThreadEvent(event: void) {
    this.activateThreadEvent.emit();
  }

  sendMessage() {
    
  }

}
