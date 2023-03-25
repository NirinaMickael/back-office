import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliderManagerComponent } from './slider-manager.component';

const routes: Routes = [
  { path: '', component: SliderManagerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SliderManagerRoutingModule { }
