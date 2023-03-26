import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuardService } from '../core/guards/role.guard';
import { LayoutComponent } from '../layout/layout.component';
import {AnalyticsComponent} from "./analytics/analytics.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AuthGuard, RoleGuardService],
        data: {
          role: ['admin', 'superAdmin','artist'],
        },
      },
      {
        path: 'oeuvres',
        loadChildren: () =>
          import('./oeuvre/oeuvre.module').then((m) => m.OeuvreModule),
        canActivate: [AuthGuard],
        data: {
          role: ['artist']
        }
      },
      {
        path:'category',
        loadChildren : ()=>
        import ('./category/category.module').then(m=>m.CategoryModule),
        canActivate:[AuthGuard],
        data : {
          role:['artist']
        }
      },
      {
        path: 'file-manager',
        loadChildren: () =>
          import('./video-manager/video-manager.module').then((m) => m.VideoManagerModule),
      },
      {
        path: 'order',
        loadChildren: ()=> import('./order/order.module').then(m=> m.OrderModule)
      },
      {
        path: 'statistics',
        loadChildren: ()=> import('./statistics/statistics.module').then(m=> m.StatisticsModule)
      },
      {
        path: 'help',
        loadChildren: ()=> import('./help/help.module').then(m=> m.HelpModule)
      },
      // {
      //   path: 'text-manager',
      //   loadChildren: () =>
      //     import('./text-manager/text-manager.module').then((m) => m.TextManagerModule),
      // },
      // {
      //   path: 'timer-manager',
      //   loadChildren: () =>
      //     import('./timer-manager/timer-manager.module').then((m) => m.TimerManagerModule),
      // },
      // {
      //   path: 'games-background-music',
      //   loadChildren: () =>
      //     import('./background-music/background-music.module').then((m) => m.TimerManagerModule),
      // },
      // {
      //   path: 'log',
      //   loadChildren: () =>
      //     import('src/app/pages/log/log.module').then((m) => m.LogModule),
      // },
      // {
      //   path: 'score',
      //   loadChildren: () =>
      //     import('src/app/pages/score/score.module').then((m) => m.ScoreModule),
      // },
      {
        path: 'analytics',
        component: AnalyticsComponent
      },
      // // {
      // //   path: 'chat/faq',
      // //   loadChildren: () =>
      // //     import('./chat-faq/chat-faq.module').then((m) => m.ChatFaqModule),
      // // },
      // {
      //   path: 'chat/live',
      //   loadChildren: () =>
      //     import('./live-chat/live-chat.module').then((m) => m.LiveChatModule),
      //   canActivate: [AuthGuard, RoleGuardService],
      //   data: {
      //     role: ['admin','superAdmin'],
      //     canChat: true
      //   },
      // },
      // {
      //   path: 'reporting',
      //   loadChildren: () =>
      //     import('./reporting/reporting.module').then((m) => m.ReportingModule),
      // },
      // {
      //   path: 'slider-manager',
      //   loadChildren: () =>
      //     import('./slider-manager/slider-manager.module').then((m) => m.SliderManagerModule),
      // },
      // {
      //   path: 'section-manager',
      //   loadChildren: () =>
      //     import('./section-manager/section-manager.module').then((m) => m.SectionManagerModule),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
