import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';

import { ChatAreaComponent } from './components/chat-area/chat-area.component';
import { ThreadComponent } from './components/thread/thread.component';
import { DirectChatAreaComponent } from './components/direct-chat-area/direct-chat-area.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SelectAvatarComponent } from './components/select-avatar/select-avatar.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { ChannelChatComponent } from './components/channel-chat/channel-chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DialogAddChannelComponent } from './components/dialog-add-channel/dialog-add-channel.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ThreadChatAreaComponent } from './components/thread-chat-area/thread-chat-area.component';
import { DirectChatComponent } from './components/direct-chat/direct-chat.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FirebaseService } from './services/firebase.service';
import { ChannelService } from './services/channel.service';
import { MessageService } from './services/message.service';

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
    ThreadChatAreaComponent,
    DirectChatComponent,
    ChatAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatMenuModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [FirebaseService, ChannelService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
