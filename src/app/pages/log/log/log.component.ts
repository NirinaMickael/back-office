import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogEntry } from 'src/app/core/schemas/log.schema';
import * as logAction from 'src/app/core/store/actions/log.action';
import { selectAllLogs } from 'src/app/core/store/selectors/log.selector';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LogDetailComponent } from '../dialog/log-detail/log-detail.component';
import { sortByCretedDate } from 'src/app/core/store/reducers/users.reducer';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  public displayedColumns: string[] = ['email', 'domain', 'action', 'success', 'detail', 'actiondate', 'view'];
  public dataSource: any;
  public totalLogs: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getLogWithPaginationAndSort();
  }

  // Get all logs + paginator and sort
  getLogWithPaginationAndSort() {
    this.store.select(selectAllLogs).subscribe((res: any) => {
      const resSortByDateAsc = this.sortByDate(res);
      this.totalLogs = res.length;
      this.dataSource = new MatTableDataSource<LogEntry[]>(resSortByDateAsc);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.store.dispatch(logAction.logLoadRequested());
  }

  // Sort by ASC by date
  sortByDate(arr) {
    arr.sort((a,b) => {
      return Number(new Date(b.actionDate)) - Number(new Date(a.actionDate));
    });

    return arr;
  }

  // Filter input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Open Dialog
  openDialog(element: any) {
    this.dialog.open(LogDetailComponent, {
      data: {
        detail: element
      },
      width: '600px'
    })
  }

}