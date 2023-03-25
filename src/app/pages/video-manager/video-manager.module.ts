import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoManagerComponent } from './video-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoManagerRoutingModule } from './video-manager-routing.module';
import { AddVideoComponent } from './add-video/add-video.component';

@NgModule({
  declarations: [
    VideoManagerComponent,
    AddVideoComponent
  ],
  imports: [
    CommonModule,
    VideoManagerRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ]
})
export class VideoManagerModule { }
