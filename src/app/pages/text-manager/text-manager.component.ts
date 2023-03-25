import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { TextEntry } from 'src/app/core/schemas/text.schema';
import { selectAllTexts, selectTextSaving } from 'src/app/core/store/selectors/texts.selector';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import * as textAction from '../../core/store/actions/texts.action';
import { TextManagerAddModalComponent } from './text-manager-add-modal/text-manager-add-modal.component';
import { TextManagerEditModalComponent } from './text-manager-edit-modal/text-manager-edit-modal.component';

@Component({
  selector: 'app-text-manager',
  templateUrl: './text-manager.component.html',
  styleUrls: ['./text-manager.component.scss']
})
export class TextManagerComponent implements OnInit {

  public unsubscribeAll: Subject<boolean>;

  texts$: Observable<TextEntry[]>;
  texts: TextEntry[];
  saving$: Observable<boolean>;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'page',
    'title',
    'subtitle',
    'createdAt',
    'actions',
  ];

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
        this.texts = texts.sort((a, b) => +a.sequence - +b.sequence);
        this.dataSource = new MatTableDataSource<TextEntry>(this.texts);
        // this.dataSource.sort = this.sort;
      }
    });

    this.saving$ = this.store.select(selectTextSaving);
  }

  add(): void {
    this.dialog.open(TextManagerAddModalComponent, {});
  }

  edit(text): void {
    const editModal = this.dialog.open(TextManagerEditModalComponent, {
      data: text,
    });
    editModal.afterClosed().subscribe(() => {
      this.store.dispatch(textAction.textLoadRequested());
    });
  }

  delete(text): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        action: 'Delete',
        message: 'Are you sure you want to delete this text?',
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

