import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';
import { FirebaseService } from '../../services/firebase.service';
import { ChannelService } from 'src/app/services/channel.service';
@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss'],
})
export class DialogAddChannelComponent {
  channel: Channel = new Channel();

  constructor(
    private dialogRef: MatDialogRef<DialogAddChannelComponent>,
    private fb: FirebaseService,
    private channelService: ChannelService,
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  async addChannel() {
    if (this.channel.name) {
      this.channelService.addChannel(this.channel);
      this.closeDialog();
    }
  }
}
