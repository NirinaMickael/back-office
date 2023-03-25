import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerManagerComponent } from './timer-manager.component';

const routes: Routes = [
  { path: '', component: TimerManagerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimerManagerRoutingModule { }
