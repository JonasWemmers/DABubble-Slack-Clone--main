import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { LoginComponent } from './login/login.component';
import { ThreadComponent } from './thread/thread.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChannelChatComponent } from './channel-chat/channel-chat.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { DirectChatAreaComponent } from './direct-chat-area/direct-chat-area.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegistrationComponent } from './registration/registration.component';
import { SelectAvatarComponent } from './select-avatar/select-avatar.component';
import { NewPasswordComponent } from './new-password/new-password.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
