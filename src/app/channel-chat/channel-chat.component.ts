import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChannelService } from '../channel.service';
import { SharedService } from '../services/shared.service';


@Component({
  selector: 'app-channel-chat',
  templateUrl: './channel-chat.component.html',
  styleUrls: ['./channel-chat.component.scss']
})
export class ChannelChatComponent implements OnInit {

  selectedChannel: string = '';

  constructor(private channelService: ChannelService,
    private sharedService: SharedService) {}

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
    
  }

}
