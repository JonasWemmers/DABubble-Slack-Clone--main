import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  currentMessage: any;
  isThreadOpen!: boolean;

  constructor(private messageService: MessageService, private channelService: ChannelService) { }
  @Output() closeThreadEvent: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.messageService.currentMessage$.subscribe(
      (message) => (this.currentMessage = message)
    );

    this.messageService.isThreadOpen$.subscribe(
      (isThreadOpen) => (this.isThreadOpen = isThreadOpen)
    )
  }



  closeThread() {
    this.closeThreadEvent.emit();
  }


}
