import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-channel-chat',
  templateUrl: './channel-chat.component.html',
  styleUrls: ['./channel-chat.component.scss']
})
export class ChannelChatComponent {

  @Output() activateThreadEvent: EventEmitter<void> = new EventEmitter<void>();

  passActivateThreadEvent(event: void) {
    this.activateThreadEvent.emit();
  }

}
