import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ThreadChatAreaComponent } from './thread-chat-area/thread-chat-area.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatMenuModule,
    RouterModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
