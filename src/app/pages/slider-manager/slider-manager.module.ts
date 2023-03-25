import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderManagerRoutingModule } from './slider-manager-routing.module';
import { SliderManagerComponent } from './slider-manager.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { SliderManagerAddComponent } from './slider-manager-add/slider-manager-add.component';


@NgModule({
  declarations: [
    SliderManagerComponent,
    SliderManagerAddComponent,
  ],
  imports: [
    CommonModule,
    SliderManagerRoutingModule,
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
    MatSlideToggleModule,
    MatExpansionModule,
    SharedModule,
    MatCardModule
  ]
})
export class SliderManagerModule { }
