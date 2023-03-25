import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatFaqComponent } from './chat-faq.component';

const routes: Routes = [
  { path: '', component: ChatFaqComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatFaqRoutingModule { }
