import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { FirebaseService } from '../../services/firebase.service';
import { collection, getDoc } from 'firebase/firestore';
import { ChannelService } from '../../services/channel.service';
import { Channel } from '../../../models/channel.class';
import { timeout } from 'rxjs';
import { User } from 'firebase/auth';
import { SharedService } from '../../services/shared.service';

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
  channelInterval:any;
  channelsLoaded: boolean = false;

  constructor(
    public dialog: MatDialog,
    public fb: FirebaseService,
    private sharedService: SharedService,
    private channelService: ChannelService
  ) {}

  ngOnInit(): void {
    this.getChannels();
  }

  async getChannels() {
    try {
      await this.channelService.loadChannels();
      this.channels = this.channelService.channels;
      console.log(this.channels);
    } catch (error) {
      console.log('Error loading channels in sidebar', error);
    }
  }

  updateChannelIDs() {
    if (this.channels.length > 0) {
      this.channels.forEach((element) => {
       let channel = element.toJSON();
        console.log(channel);
        this.fb.updateElementFDB('channelList', channel.id, channel)
      });
      clearInterval(this.channelInterval)
    } else {
    }
  }

  selectChannel(channel: Channel): void {
    this.channelService.currentChannelId = channel.id;
    console.log(`Selected channel ID: ${channel.name.toLowerCase()}`);
    this.channelService.setSelectedChannel(channel.name.toLowerCase());
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
