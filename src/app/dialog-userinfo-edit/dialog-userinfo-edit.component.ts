import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-userinfo-edit',
  templateUrl: './dialog-userinfo-edit.component.html',
  styleUrls: ['./dialog-userinfo-edit.component.scss'],
})
export class DialogUserinfoEditComponent {
  data: any = [
    {
      animal: 'panda',
    },
  ];
}
