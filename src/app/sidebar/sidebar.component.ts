import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { FirebaseService } from '../firebase.service';
import { collectionData, getDocs } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

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

  constructor(public dialog: MatDialog, private firebase: FirebaseService) {
    firebase.getSubColls()
  }


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
