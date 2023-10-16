import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { ThreadComponent } from './thread/thread.component';
import { DirectChatAreaComponent } from './direct-chat-area/direct-chat-area.component';
import { RegistrationComponent } from './registration/registration.component';
import { SelectAvatarComponent } from './select-avatar/select-avatar.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { ChannelChatComponent } from './channel-chat/channel-chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    ChatAreaComponent,
    ThreadComponent,
    DirectChatAreaComponent,
    RegistrationComponent,
    SelectAvatarComponent,
    PasswordResetComponent,
    NewPasswordComponent,
    StartScreenComponent,
    ChannelChatComponent,
    DialogAddChannelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
