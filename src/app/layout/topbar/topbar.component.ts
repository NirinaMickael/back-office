import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { UserEntry } from 'src/app/core/schemas/users.schema';
import decode from 'jwt-decode';
import { accountLogoutRequested, getUserRequested } from 'src/app/core/store/actions/account.action';
import { switchMap, takeUntil } from 'rxjs/operators';
import { selectAccount, selectAccountName } from 'src/app/core/store/selectors/account.selector';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { EditProfilComponent } from './dialog/edit-profil/edit-profil.component';
import { selectCurrentUser } from 'src/app/core/store/selectors/users.selector';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  public account: UserEntry;
  public unsubscribeAll: Subject<boolean>;
  public accountName$: Observable<any>;
  public displayIdentity$: Observable<any>;
  public myName: string;
  public myAccount: any;

  constructor(protected store: Store, public dialog: MatDialog) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    if (localStorage.getItem('access-token')) {
      const token: any = decode(localStorage.getItem('access-token'));
      this.store.dispatch(getUserRequested({ input: { _id: token._id } }));
    }

    this.accountName$ = this.store.pipe(
      select(selectAccountName),
      takeUntil(this.unsubscribeAll)
    );

    this.displayIdentity$ = this.store.select(selectAccountName);

    this.store.select(selectAccountName).pipe(
      switchMap(resName => this.store.select(selectCurrentUser(resName.id)))
    ).subscribe((res: any) => {
      this.myName = res[0]?.name || res[0]?.email;
      this.myAccount = res[0];
    })

    this.store.select(selectAccount).subscribe(res => {
      this.account = res
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  logout(): void {
    const helper = new JwtHelperService();
    const token: any = helper.decodeToken(localStorage.getItem('access-token'));
    console.log("token logout", token)
    this.store.dispatch(accountLogoutRequested({
      input: token._id
    }));
  }

  requestLogout(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        action: 'Logout',
        message: 'Are you sure you want to log out?',
        icon: 'warning',
        color: 'red'
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.result && res.result === 'confirmed') {
        this.logout();
      }
    });
  }

  openDialog() {
    this.dialog.open(EditProfilComponent, {
      data: this.myAccount,
      width: '400px'
    })
  }

  setLocalToParis() {
    localStorage.setItem('visitorTimeZone', 'Europe/Paris');
    console.log('Local', localStorage.getItem(('visitorTimeZone')));
  }
}
