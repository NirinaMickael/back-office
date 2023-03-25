import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { TextEntry } from '../../core/schemas/text.schema';
import { selectAllTexts, selectTextSaving } from '../../core/store/selectors/texts.selector';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import * as textAction from '../../core/store/actions/texts.action';
import { TimerManagerAddModalComponent } from './timer-manager-add-modal/timer-manager-add-modal.component';

@Component({
  selector: 'app-timer-manager',
  templateUrl: './timer-manager.component.html',
  styleUrls: ['./timer-manager.component.scss']
})
export class TimerManagerComponent implements OnInit {

  public unsubscribeAll: Subject<boolean>;

  texts$: Observable<TextEntry[]>;
  texts: TextEntry[];
  textsInit: TextEntry[];
  saving$: Observable<boolean>;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'page',
  ];

  timerInEdition = undefined

  constructor(
    private store: Store,
    public dialog: MatDialog
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.store.dispatch(textAction.textLoadRequested());
    this.texts$ = this.store.select(selectAllTexts);
    this.texts$.subscribe((texts) => {
      if (texts && texts.length) {
        this.texts = texts
        this.texts = texts.filter(e => e.timer).map(el => {
          const timeFormatted = el.timeInSecond ? new Date(el.timeInSecond * 1000).toISOString().substr(14, 5) : 'N/A'
          return { ...el, timeFormatted }
        });
        this.texts = this.texts.sort((a, b) => +a.sequence - +b.sequence)
        this.textsInit = [...this.texts]
        this.dataSource = new MatTableDataSource<TextEntry>(this.texts);
        this.dataSource.sort = this.sort;
      }
    });

    this.saving$ = this.store.select(selectTextSaving);
  }

  edit(item): void {
    const dialogRef = this.dialog.open(TimerManagerAddModalComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.store.dispatch(textAction.textLoadRequested());
    });
  }

  add(): void {
    const dialogRef = this.dialog.open(TimerManagerAddModalComponent, {});
    dialogRef.afterClosed().subscribe((res) => {
      this.store.dispatch(textAction.textLoadRequested());
    });
  }

  delete(text): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        action: 'Delete',
        message: 'Are you sure you want to delete this timer?',
        icon: 'warning',
        color: 'red',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.result && res.result === 'confirmed') {
        this.store.dispatch(textAction.textDeleteRequested({ entry: text }));
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue) this.texts = this.textsInit.filter(e => e.page.includes(filterValue.trim().toLowerCase()))
    else this.texts = this.textsInit
  }

}

