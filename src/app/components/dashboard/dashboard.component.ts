import { Component, OnDestroy } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  isThreadActive: boolean = false;
  threadSubscription: Subscription;
  isChannelChatActive: boolean = true;
  isDirectChatActive: boolean = false;
  changeWidth: string = 'calc(100% - 48px)';

  constructor(private messageService: MessageService) {
    this.threadSubscription = this.messageService.isThreadOpen$.subscribe((isThreadOpen: boolean) => {
      this.isThreadActive = isThreadOpen;
      if (this.isThreadActive) {
        this.activateThread();
      }
    })
  }


  ngOnDestroy(): void {
    this.threadSubscription.unsubscribe();
  }



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
    this.isThreadActive = false;
    this.changeWidth = 'calc(100% - 48px)';
  }

}
