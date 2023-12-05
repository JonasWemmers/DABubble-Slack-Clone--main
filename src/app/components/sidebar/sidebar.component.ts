import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { FirebaseService } from '../../services/firebase.service';
import { ChannelService } from '../../services/channel.service';
import { Channel } from '../../../models/channel.class';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  directchat_users: any = [];
  directchatDropdown: boolean = true;
  ChannelDropdown: boolean = true;
  channels: Channel[] = [];

  constructor(public dialog: MatDialog, public fb: FirebaseService, private channelService: ChannelService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getChannels();
  }


  async getChannels() {
    try {
      await this.channelService.loadChannels();
      this.channels = this.channelService.channels;
    } catch (error) {
      console.log('Error loading channels in sidebar', error);
    }
  }


  selectChannel(channel: Channel): void {
    this.messageService.closeThread();
    this.messageService.closeDirectChat();
    this.messageService.openChannelChat();
    this.channelService.currentChannelId = channel.id;
    console.log('ChannelID is:', channel.id);
    this.channelService.setSelectedChannel(channel.name.toLowerCase());
    this.channelService.setCurrentChannel();
  }

  openCloseDropdownDirectchat() {
    if (this.directchatDropdown) {
      this.directchatDropdown = false;
    } else {
      this.directchatDropdown = true;
    }
  }

  openCloseDropdownChannel() {
    if (this.ChannelDropdown) {
      this.ChannelDropdown = false;
    } else {
      this.ChannelDropdown = true;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddChannelComponent, {});
  }
}
