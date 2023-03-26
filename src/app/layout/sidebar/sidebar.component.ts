import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserEntry } from 'src/app/core/schemas/users.schema';
import { selectAccount } from 'src/app/core/store/selectors/account.selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuList = [
    {
      name: 'Users',
      icon: 'people',
      path: '/users',
      role: [
        'admin',
        'superAdmin',
      ]
    },
    {
      name: 'Products',
      icon: 'folder_open',
      path: '/oeuvres',
    },
    {
      name: 'Categorie',
      icon: 'folder_open',
      path: '/category',
    },

    {
      name: 'Order',
      icon: 'shop',
      path: 'order'
    },
    {
      name: 'Statistics',
      icon: 'confirmation_number',
      path: 'statistics'
    },
    {
      name:'Help',
      icon:'help_outline',
      path:'help'
    },
    // {
    //   name: 'Slider Manager',
    //   icon: 'input',
    //   path: '/slider-manager',
    // },
    // {
    //   name: 'Section Manager',
    //   icon: 'dashboard',
    //   path: '/section-manager',
    // },
    // {
    //   name: 'Text Manager',
    //   icon: 'notes',
    //   path: '/text-manager',
    // },
    // {
    //   name: 'Timer Manager',
    //   icon: 'timer',
    //   path: '/timer-manager',
    // },
    // {
    //   name: 'Background Music Manager',
    //   icon: 'library_music',
    //   path: '/games-background-music',
    // },
    // // {
    // //   name: 'Log',
    // //   icon: 'list',
    // //   path: '/log',
    // // },
    // // {
    // //   name: 'Scores',
    // //   icon: 'sports_score',
    // //   path: '/score',
    // // },
    // // {
    // //   name: 'Chat FAQ',
    // //   icon: 'settings',
    // //   path: '/chat/faq',
    // // },
    // // {
    // //   name: 'Reporting',
    // //   icon: 'analytics',
    // //   path: '/reporting',
    // // },
    {
      name: 'Analytics',
      icon: 'bar_chart',
      path: '/analytics',
      role: [
        'superAdmin',
      ]
    },
  ];

  account$: Observable<UserEntry>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectAccount).subscribe((res) => {
      if(!res) return;
      if (res.canChat) {
        this.menuList.push({
          name: 'Live Chat',
          icon: 'chat',
          path: '/chat/live',
        });
      }
      this.menuList = this.menuList.filter((menu) => {
        if (!menu.role) {
          return true;
        } 
        return menu.role.includes(res.role)
      })
    });
  }

}
