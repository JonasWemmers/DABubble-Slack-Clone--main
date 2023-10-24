import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { SharedService } from '../services/shared.service';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {

  @Output() activateThreadEvent: EventEmitter<void> = new EventEmitter<void>();

  formattedDate!: string;

  selectedChannel!: string;
  channelName!: string;
  firstMessage!: string;
  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute, private sharedService: SharedService, private channelService: ChannelService) { }


  ngOnInit() {
    this.formatiereDatum();
    this.route.params.subscribe((params) => {
      this.channelName = params['channelName'];
      this.channelService.channelSelected.subscribe((selectedChannel) => {
        if (this.selectedChannel === this.channelName) {
          this.loadFirstMessage();
        }
      });
    });
  }

  async loadFirstMessage(): Promise<void> {
    try {
      this.channelName = this.route.snapshot.params['channelName'];
      const firstMessageData = await this.firebaseService.getFirstMessage('allgemein', this.channelName);
  
      // Annahme: "message" ist das Feld, das die Nachricht enthält
      this.firstMessage = firstMessageData?.message || 'Keine Nachricht gefunden';
    } catch (error) {
      // Handle error
      console.error('Error loading first message:', error);
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

  onActivateThreadClick() {
    this.activateThreadEvent.emit();
  }



}
