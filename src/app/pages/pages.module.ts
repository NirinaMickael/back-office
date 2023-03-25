import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { AnalyticsComponent } from './analytics/analytics.component';
import { VideoManagerModule } from './video-manager/video-manager.module';
@NgModule({
  declarations: [
    AnalyticsComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    VideoManagerModule
  ]
})
export class PagesModule { }
