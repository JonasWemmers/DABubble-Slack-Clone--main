import { Component, OnDestroy  } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  isThreadActive: boolean = false;
  threadSubscription: Subscription;

  constructor(private channelService: ChannelService, private messageService: MessageService) {
    this.threadSubscription = this.messageService.isThreadOpen$.subscribe((isThreadOpen: boolean) => {
      this.isThreadActive = isThreadOpen;
    })
  }


  ngOnDestroy(): void {
    this.threadSubscription.unsubscribe();
  }

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
    this.changeWidth = 'calc(100% - 108px)';
  }

  handleThreadClosed() {
    console.log('Thread wurde geschlossen');
    this.isThreadActive = false;
    this.changeWidth = 'calc(100% - 48px)';
  }

}
