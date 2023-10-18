import { Component  } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  isThreadActive: boolean = false;
  isChannelChatActive: boolean = true;
  isDirectChatActive: boolean = false;
  changeWidth: string = 'calc(100% - 48px)';

  switchToChannelChat() {
    this.isChannelChatActive = true;
    this.isDirectChatActive = false;
  }

  switchToDirectChat() {
    this.isChannelChatActive = false;
    this.isDirectChatActive = true;
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
