import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatFaqRoutingModule } from './chat-faq-routing.module';
import { ChatFaqUpdateComponent } from './chat-faq-update/chat-faq-update.component';
import { ChatFaqAddComponent } from './chat-faq-add/chat-faq-add.component';
import { ChatFaqCardComponent } from './chat-faq-card/chat-faq-card.component';
import { ChatFaqComponent } from './chat-faq.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const MaterialModules = [
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule
]

@NgModule({
  declarations: [
    ChatFaqComponent,
    ChatFaqCardComponent,
    ChatFaqAddComponent,
    ChatFaqUpdateComponent
  ],
  imports: [
    CommonModule,
    ChatFaqRoutingModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    Ng2SearchPipeModule,
    ...MaterialModules
  ]
})
export class ChatFaqModule { }
