import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { LoginComponent } from './login/login.component';
import { ThreadComponent } from './thread/thread.component';

const routes: Routes = [
  
  {path: '', component: StartScreenComponent, children: [
    {path: 'login', component: LoginComponent},
    
  ]},
  {path: 'thread', component: ThreadComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
