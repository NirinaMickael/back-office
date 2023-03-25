import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoManagerComponent } from './video-manager.component';

const routes: Routes = [
  { path: "", component: VideoManagerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoManagerRoutingModule { }
