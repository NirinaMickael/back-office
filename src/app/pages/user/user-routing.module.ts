import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDefaultComponent } from './user-default/user-default.component';

const routes: Routes = [
  { path: "", component: UserDefaultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
