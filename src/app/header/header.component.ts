import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserinfoEditComponent } from '../dialog-userinfo-edit/dialog-userinfo-edit.component';
import { first } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  first_menu_edit:boolean = false;
  pb_edit_menu:boolean = false;
  second_menu:boolean = false;

  constructor(public dialog: MatDialog) {}

  openMenu(){
    this.second_menu = false;
    this.pb_edit_menu = false;
    if(!this.first_menu_edit){
      this.first_menu_edit = true;
    }
    else{
      this.first_menu_edit = false;
    }    
  }
  openProfile(){
    this.first_menu_edit = false;
    this.second_menu = true;
  }
  openEditMenu(){
    this.first_menu_edit = false;
    this.second_menu = false;
    this.pb_edit_menu = true;
  }

}
