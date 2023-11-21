import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { ChannelService } from '../../services/channel.service';
import { MessageService } from 'src/app/services/message.service';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {

  @Output() activateThreadEvent: EventEmitter<void> = new EventEmitter<void>();
  channel: Channel[] = [];
  formattedDate!: string;
  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute, private channelService: ChannelService, private messageService: MessageService) {}


  async ngOnInit() {
    try {
      await this.channelService.loadChannels()
      await this.channelService.setCurrentChannelId();
      await this.messageService.loadChannel();
      this.channel = this.messageService.channel;
      console.log(this.channel);
    } catch (error) {
      console.error('Error initializing component:', error);
    }
  }

  private formatiereDatum() {
    const tage = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const monate = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const aktuellesDatum = new Date();
    const wochentag = tage[aktuellesDatum.getDay()];
    const tag = aktuellesDatum.getDate();
    const monat = monate[aktuellesDatum.getMonth()];
    this.formattedDate = `${wochentag}, ${tag}. ${monat}`;
  }

  // onActivateThreadClick() {
  //   this.activateThreadEvent.emit();
  //   console.log('onActivateThreadEvent() called');
  // }

}
