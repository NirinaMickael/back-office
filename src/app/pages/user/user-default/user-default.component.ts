import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { UserEntry } from 'src/app/core/schemas/users.schema';
import * as userAction from '../../../core/store/actions/users.action';
import { selectAllUsers, selectUserByRole, selectUserSaving } from 'src/app/core/store/selectors/users.selector';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserAddModalComponent } from '../user-add-modal/user-add-modal.component';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';
import { selectAccount } from 'src/app/core/store/selectors/account.selector';

@Component({
  selector: 'app-user-default',
  templateUrl: './user-default.component.html',
  styleUrls: ['./user-default.component.scss'],
})
export class UserDefaultComponent implements OnInit {
  public unsubscribeAll: Subject<boolean>;

  users$: Observable<UserEntry[]>;
  users: UserEntry[];
  saving$: Observable<boolean>;
  account: UserEntry;

  displayedColumns: string[]

  displayedColumnsAdmin: string[]= [
    'avatar',
    // 'name',
    'email',
    'role',
    'status',
    'createdAt',
    'updatedAt',
    'actions',
  ];
  displayedColumnsSuperAdminAdmin: string[] =  [
    'avatar',
    // 'name',
    'email',
    'canChat',
    'role',
    'status',
    'createdAt',
    'updatedAt',
    'actions',
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userLabel: string;

  constructor(private store: Store, public dialog: MatDialog) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.store.dispatch(userAction.userLoadRequested());
    this.users$ = this.store.select(selectAllUsers);
    this.users$.subscribe((users) => {
      this.userLabel = 'Users list';
      this.users = users;
      this.dataSource = new MatTableDataSource<UserEntry>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.saving$ = this.store.select(selectUserSaving);

    this.store.select(selectAccount).subscribe(res => {
      if (res) {
        this.account = res
        this.displayedColumns =
          this.account.role === 'superAdmin'
            ? this.displayedColumnsSuperAdminAdmin
            : this.displayedColumnsAdmin;
      }
    })
  }
  onChangeCategory(e:any){
    this.store.select(selectUserByRole(e.value)).subscribe((users)=>{
      this.users = users;
      this.dataSource = new MatTableDataSource<UserEntry>(this.users);
    });
  }
  addUser(): void {
    this.dialog.open(UserAddModalComponent, {});
  }

  editUser(user): void {
    const editModal = this.dialog.open(UserEditModalComponent, {
      data: user,
    });
    editModal.afterClosed().subscribe(() => {
      this.store.dispatch(userAction.userLoadRequested());
    });
  }

  deleteObject(user): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        action: 'Delete',
        message: 'Are you sure you want to delete this user?',
        icon: 'warning',
        color: 'red',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.result && res.result === 'confirmed') {
        this.store.dispatch(userAction.userDeleteRequested({ entry: user }));
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateAdminChatStatus(user) {
    console.log("can chat", user.canChat, !user.canChat)
    this.store.dispatch(userAction.userUpdateRequested({
      param: user._id,
      body: {...user, canChat: !user.canChat }
    }))
  }
}
