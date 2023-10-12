import { Component } from '@angular/core';

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
    }
  ];
  directchatDropdown:boolean = true;
  ChannelDropdown:boolean = true;

  openCloseDropdownDirectchat(){
    if(this.directchatDropdown){
      this.directchatDropdown = false;
    }
    else{
      this.directchatDropdown = true;
    }
  }

  openCloseDropdownChannel(){
    if(this.ChannelDropdown){
      this.ChannelDropdown = false;
    }
    else{
      this.ChannelDropdown = true;
    }
  }
}
