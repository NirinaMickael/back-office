import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextManagerComponent } from './text-manager.component';

const routes: Routes = [
  { path: '', component: TextManagerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextManagerRoutingModule { }
