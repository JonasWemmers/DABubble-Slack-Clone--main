import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { FirebaseService } from '../firebase.service';
import { collectionData, getDocs } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { ChannelService } from '../channel.service';
// import { Channel } from '../models/channel.class';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit { 

  directchat_users: any = [
    {
      'name': 'Frederik Becker (Du)',
    },
    {
      'name': 'Harry Potter',
    },
    {
      'name': 'Ron Weasley',
    },
    {
      'name': 'Hermine Granger',
    },
    {
      'name': 'Rubius Hagrit',
    },
    {
      'name': 'Severus Snap',
    },

  ];
  directchatDropdown: boolean = true;
  ChannelDropdown: boolean = true;
  // channels: Channel[] = [];

  constructor(public dialog: MatDialog, private fb: FirebaseService, @Inject(ChannelService) private channelService: ChannelService) {
    fb.getSubColDocs('entwicklerteam','WPLt7nxgwgzFyM8uUhJV','thread');
  }

  ngOnInit(): void {
    // this.getChannels();
  }

  // getChannels(): void {
  //   this.channelService.getChannels().subscribe((channels: Channel[]) => {
  //     this.channels = channels;
  //   });
  // }

  // selectChannel(channel: Channel): void {
  //   // Hier kannst du die Logik hinzufügen, die bei der Auswahl eines Kanals ausgeführt werden soll.
  //   // Zum Beispiel: die Anzeige der Nachrichten für den ausgewählten Kanal.
  //   console.log(`Selected channel: ${channel.name}`);
  // }

  openCloseDropdownDirectchat() {
    if (this.directchatDropdown) {
      this.directchatDropdown = false;
    }
    else {
      this.directchatDropdown = true;
    }
  }

  openCloseDropdownChannel() {
    if (this.ChannelDropdown) {
      this.ChannelDropdown = false;
    }
    else {
      this.ChannelDropdown = true;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddChannelComponent, {
    });
  }
}
