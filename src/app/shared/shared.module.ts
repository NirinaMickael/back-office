import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { environment } from 'src/environments/environment';
import {
  DropzoneConfigInterface,
  DropzoneModule,
  DROPZONE_CONFIG,
} from 'ngx-dropzone-wrapper';
import { DefaultButtonComponent } from './default-button/default-button.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { CardCheckableComponent } from './card-checkable/card-checkable.component';
import { ImgLoaderComponent } from './img-loader/img-loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    UploadFileComponent,
    DefaultButtonComponent,
    SnackbarComponent,
    ConfirmModalComponent,
    LeaderboardComponent,
    CardCheckableComponent,
    ImgLoaderComponent,
  ],
  imports: [
    CommonModule,
    DropzoneModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule,
    MatCardModule,
    MatCheckboxModule,
    MatRippleModule,
    NgxSkeletonLoaderModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    AngularEditorModule,
  ],
  exports: [
    UploadFileComponent,
    LeaderboardComponent,
    DefaultButtonComponent,
    CardCheckableComponent,
    ImgLoaderComponent,
  ],
})
export class SharedModule {}
