import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss'],
})
export class DialogAddChannelComponent {
  channel: Channel = new Channel();

  constructor(
    public dialogRef: MatDialogRef<DialogAddChannelComponent>,
    public fb: FirebaseService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  async addChannel() {
    if (this.channel.name) {
      await this.fb.addElementFDB('channelList', this.channel.toJSON());
      this.closeDialog();
    }
  }
}
