import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveChatComponent } from './live-chat.component';

const routes: Routes = [
  { path: '', component: LiveChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveChatRoutingModule { }
