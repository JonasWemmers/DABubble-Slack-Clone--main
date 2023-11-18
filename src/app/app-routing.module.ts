import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { LoginComponent } from './components/login/login.component';
import { ThreadComponent } from './components/thread/thread.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChannelChatComponent } from './components/channel-chat/channel-chat.component';
import { ChatAreaComponent } from './components/chat-area/chat-area.component';
import { DirectChatAreaComponent } from './components/direct-chat-area/direct-chat-area.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SelectAvatarComponent } from './components/select-avatar/select-avatar.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { ThreadChatAreaComponent } from './components/thread-chat-area/thread-chat-area.component';
import { DirectChatComponent } from './components/direct-chat/direct-chat.component';

const routes: Routes = [
  
  {path: '', component: StartScreenComponent, children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Standardroute zeigt LoginComponent
    { path: 'login', component: LoginComponent },
    { path: 'pw-reset', component: PasswordResetComponent },
    { path: 'registration', component: RegistrationComponent},
    { path: 'select-avatar', component: SelectAvatarComponent},
    { path: 'new-password', component: NewPasswordComponent},

    
  ]},
  {path: 'thread', component: ThreadComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'chat-area', component: ChatAreaComponent},
  {path: 'direct-chat-area', component: DirectChatAreaComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'sidebar', component: SidebarComponent},
  {path: 'channel-chat', component: ChannelChatComponent},
  {path: 'thread-chat', component: ThreadChatAreaComponent},
  {path: 'direct-chat', component: DirectChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
