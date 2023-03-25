import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionManagerComponent } from './section-manager.component';

const routes: Routes = [
  { path: '', component: SectionManagerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionManagerRoutingModule { }
