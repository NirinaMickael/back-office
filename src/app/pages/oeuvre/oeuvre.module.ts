import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OeuvreRoutingModule } from './oeuvre-routing.module';
import { OeuvreAddModalComponent } from './oeuvre-add-modal/oeuvre-add-modal.component';
import { OeuvreEditModalComponent } from './oeuvre-edit-modal/oeuvre-edit-modal.component';
import { OeuvreDefaultComponent } from './oeuvre-default/oeuvre-default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AvatarModule } from 'ngx-avatar';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatRadioModule} from '@angular/material/radio';
import { NgxColorsModule } from 'ngx-colors';
@NgModule({
  declarations: [
    OeuvreAddModalComponent,
    OeuvreEditModalComponent,
    OeuvreDefaultComponent
  ],
  imports: [
    CommonModule,
    OeuvreRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    AvatarModule,
    MatSlideToggleModule,
    MatRadioModule,
    NgxColorsModule,
    SharedModule
  ]
})
export class OeuvreModule { }
