import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OeuvreDefaultComponent } from './oeuvre-default/oeuvre-default.component';

const routes: Routes = [
   {
    path:"",
    component:OeuvreDefaultComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OeuvreRoutingModule { }
