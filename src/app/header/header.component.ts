import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  first_menu_edit: boolean = false;
  pb_edit_menu: boolean = false;
  second_menu: boolean = false;
  profil_data: any = [{
    'name': 'Frederik Beck',
    'age': 23,
    'email': 'fred.beck@email.com'
  }]
  copy_of_name = this.profil_data[0]['name'];
  copy_of_email = this.profil_data[0]['email'];

  constructor(public dialog: MatDialog) { }

  openMenu() {
    this.second_menu = false;
    this.pb_edit_menu = false;
    if (!this.first_menu_edit) {
      this.first_menu_edit = true;
    }
    else {
      this.first_menu_edit = false;
    }
  }
  openProfile() {
    this.first_menu_edit = false;
    this.second_menu = true;
  }
  openEditMenu() {
    this.copy_of_name = this.profil_data[0]['name'];
    this.copy_of_email = this.profil_data[0]['email'];
    this.first_menu_edit = false;
    this.second_menu = false;
    this.pb_edit_menu = true;
  }

  saveUserData() {
    this.profil_data[0]['name'] = this.copy_of_name;
    this.profil_data[0]['email'] = this.copy_of_email;
    this.first_menu_edit = false;
    this.second_menu = false;
    this.pb_edit_menu = false;
  }
}
