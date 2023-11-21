import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { Channel } from 'src/models/channel.class';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnDestroy, OnInit {

  channel: Channel[] = [];
  formattedDate!: string;

  channelSubscription: Subscription;

  constructor(private channelService: ChannelService) {
    this.channelSubscription = this.channelService.channelObservable$.subscribe((currentChannel) => {
      this.channel = currentChannel;
    });
  }


  async ngOnInit() {
    this.channel = [];
    try {
      await this.channelService.loadChannels();
      await this.channelService.setCurrentChannelId();
    } catch (error) {
      console.error('Error initializing component:', error);
    }
  }

  ngOnDestroy(): void {
    this.channelSubscription.unsubscribe();
  }

  // ---> Should be something for a shared service?
  // private formatiereDatum() {
  //   const tage = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  //   const monate = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  //   const aktuellesDatum = new Date();
  //   const wochentag = tage[aktuellesDatum.getDay()];
  //   const tag = aktuellesDatum.getDate();
  //   const monat = monate[aktuellesDatum.getMonth()];
  //   this.formattedDate = `${wochentag}, ${tag}. ${monat}`;
  // }
}
