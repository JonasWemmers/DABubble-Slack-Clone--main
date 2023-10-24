import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { FirebaseService } from '../firebase.service';
import { collectionData, getDocs } from '@angular/fire/firestore';
import { collection, getDoc } from 'firebase/firestore';
import { ChannelService } from '../channel.service';
import { Channel } from '../../models/channel.class';
import { timeout } from 'rxjs';
import { User } from 'firebase/auth';
import { SharedService } from '../services/shared.service';

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
    @Inject(ChannelService) private channelService: ChannelService,
    private sharedService: SharedService
  ) {
    fb.getSubColDocs('entwicklerteam', 'WPLt7nxgwgzFyM8uUhJV', 'thread');
  }

  ngOnInit(): void {
    this.getChannels();
    this.channelInterval = setInterval(()=>{
      this.updateChannelIDs();
    },500)
    this.fillDirectChatUsers('UOTK3YB6nf9egkY8Ff4R')
  }

  getChannels(): void {
    this.channelService.getChannels().subscribe({
      next: (channels: Channel[]) => {
        this.channels = channels;
        this.sharedService.setChannelsLoaded(true);
      },
      error: (error) => {
        console.error('Error fetching channels:', error);
      },
    });
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
      console.log('runde Vorbei');
    }
  }

  selectChannel(channel: Channel): void {
    console.log(`Selected channel ID: ${channel.name.toLowerCase()}`);
    this.channelService.setSelectedChannel(channel.name.toLowerCase());
    this.channelService.channelSelected.emit(channel);
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

  async fillDirectChatUsers(docID:string){
    let userData:any = await getDoc(this.fb.getSingelDocRef('accounts',docID));
    let chatList = userData.data()['privatChats']
    this.directchat_users = [];
    this.directchat_users.push(userData.data()['name']+' (Du)')
    chatList.forEach(async (element:any) => {
      let elem:any = (await getDoc(this.fb.getSingelDocRef('accounts', element))).data();
      this.directchat_users.push(elem['name'])
    });
    
  }
}
