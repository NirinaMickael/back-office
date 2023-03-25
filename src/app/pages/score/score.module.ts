import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreRoutingModule } from './score-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ScoreListComponent } from './score-list/score-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    ScoreListComponent
  ],
  imports: [
    CommonModule,
    ScoreRoutingModule,
    MatTabsModule,
    NgxDatatableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    AvatarModule
  ]
})
export class ScoreModule { }
