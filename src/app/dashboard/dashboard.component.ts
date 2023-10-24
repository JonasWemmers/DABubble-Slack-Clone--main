import { Component  } from '@angular/core';
import { ChannelService } from '../channel.service';
import { Channel } from '../../models/channel.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private channelService: ChannelService) {
    this.channelService.channelSelected.subscribe((channel: Channel) => {
      this.switchToChannelChat();
    });
  }

  isThreadActive: boolean = false;
  isChannelChatActive: boolean = true;
  isDirectChatActive: boolean = false;
  changeWidth: string = 'calc(100% - 48px)';

  switchToChannelChat() {
    this.isChannelChatActive = true;
    this.isDirectChatActive = false;
    this.changeWidth = 'calc(100% - 48px)';
  }

  switchToDirectChat() {
    this.isChannelChatActive = false;
    this.isDirectChatActive = true;
    this.isThreadActive = false;
  }

  activateThread() {
    this.isThreadActive = true;
    this.changeWidth = 'calc(100% - 108px)';
  }

  handleThreadClosed() {
    console.log('Thread wurde geschlossen');
    this.isThreadActive = false;
    this.changeWidth = 'calc(100% - 48px)';
  }

}
