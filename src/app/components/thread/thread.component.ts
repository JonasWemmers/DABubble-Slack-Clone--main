import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ChannelService } from 'src/app/services/channel.service';
import { Channel } from 'src/models/channel.class';
import { Subscription } from 'rxjs';
import { Message } from 'src/models/message.class';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit, OnDestroy {
  @Output() closeThreadEvent: EventEmitter<void> = new EventEmitter<void>();
  channel: Channel[] = [];
  formattedDate!: string;
  channelSubscription: Subscription;
  messageSubscription: Subscription;
  newAnswer: string = '';
  currentMessage: Message[] = [];

  constructor(private messageService: MessageService, private channelService: ChannelService, private firebaseService: FirebaseService) {
    this.channelSubscription = this.channelService.channelObservable$.subscribe((currentChannel) => {
      this.channel = currentChannel;
    });
    this.messageSubscription = this.messageService.currentMessageObservable$.subscribe((currentMessage) => {
      this.currentMessage = currentMessage;
    });
  }


  ngOnInit(): void {

  }


  ngOnDestroy(): void {
    this.channelSubscription.unsubscribe();
    this.messageSubscription.unsubscribe();
  }


  closeThread() {
    this.closeThreadEvent.emit();
  }

  async sendAnswer() {
    if (this.newAnswer !== '') {
      const date = new Date().getTime();
      const answer: any = {
        message: this.newAnswer,
        timestamp: date,
        userSend: '',
        emojisByUser: {},
      };
      let index: number = this.findIndex();
      this.channel[0].messages[index].answers.push(answer);
      console.log(this.channel);
      console.log(this.channel[0].id);
      await this.firebaseService.updateElementFDB('channelList', this.channel[0].id, this.channel[0]);
    }
  }

  findIndex() {
    const timestampToFind = this.currentMessage[0].timestamp;
    const channelIndex = this.channel.findIndex((channel) => {
      return channel.messages.some((message) => {
        return message.timestamp === timestampToFind;
      });
    });
    if (channelIndex !== -1) {
      const messageIndex = this.channel[channelIndex].messages.findIndex((message) => {
        return message.timestamp === timestampToFind;
      });
      return messageIndex;
    } else {
      return -1;
    }
  }
}
