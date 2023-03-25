import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionManagerRoutingModule } from './section-manager-routing.module';
import { SectionManagerComponent } from './section-manager.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SectionManagerComponent
  ],
  imports: [
    CommonModule,
    SectionManagerRoutingModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    AngularEditorModule,
    SharedModule,
  ]
})
export class SectionManagerModule { }
