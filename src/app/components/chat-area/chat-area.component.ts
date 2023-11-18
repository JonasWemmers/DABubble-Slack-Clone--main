import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { SharedService } from '../../services/shared.service';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {

  @Output() activateThreadEvent: EventEmitter<void> = new EventEmitter<void>();

  formattedDate!: string;
  currentChannelId!: string;
  selectedChannel: string | undefined;
  channelName!: string;
  firstMessage!: string;
  channelMessages:any;
  constructor(private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private channelService: ChannelService){}


  async ngOnInit() {
    this.currentChannelId = this.sharedService.currentChannelId;
    this.channelMessages = await this.firebaseService.getMessagesChannels('allgemein');
    this.formatiereDatum();
    this.route.params.subscribe((params) => {
      this.channelName = params['channelName'];
    });
    this.sharedService.selectedChannel$.subscribe(channel => {
      console.log('Selected channel:', channel);
      this.selectedChannel = channel;
      this.loadChannelMessages();
    });
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
    console.log('onActivateThreadEvent() called');
  }

  async loadChannelMessages(): Promise<void> {
    if (this.selectedChannel) {
      // Hier kannst du den ausgewählten Kanalnamen verwenden, um die Nachrichten zu laden
      console.log('Selected channel:', this.selectedChannel);
      
      try {
        // Beispiel: Laden der Nachrichten für 'allgemein'
        this.channelMessages = await this.firebaseService.getMessagesChannels(this.selectedChannel.toLowerCase());
      } catch (error) {
        console.error('Error loading channel messages:', error);
      }
    }
  }
}
