import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ChannelService } from 'src/app/services/channel.service';
import { Channel } from 'src/models/channel.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit, OnDestroy {
  channel: Channel[] = [];
  formattedDate!: string;
  channelSubscription: Subscription;

  constructor(private messageService: MessageService, private channelService: ChannelService) { 
    this.channelSubscription = this.channelService.channelObservable$.subscribe((currentChannel) => {
      this.channel = currentChannel;
    });
  }
  @Output() closeThreadEvent: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {

    
  }


  ngOnDestroy(): void {
    this.channelSubscription.unsubscribe();
  }


  closeThread() {
    this.closeThreadEvent.emit();
  }


}
