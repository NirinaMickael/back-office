import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { AssetEntry } from 'src/app/core/schemas/asset.schema';
import { selectAllAssets } from 'src/app/core/store/selectors/asset.selector';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import * as assetAction from '../../core/store/actions/asset.action';
import { AddVideoComponent } from './add-video/add-video.component';

@Component({
  selector: 'app-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.scss']
})
export class VideoManagerComponent implements OnInit {

  urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

  image = undefined
  public unsubscribeAll: Subject<boolean>;

  assets$: Observable<AssetEntry[]>;
  assets: AssetEntry[];

  displayedColumns: string[] = ['preview', 'description', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  assetLabel: string;

  allAssets = []
  filter

  constructor(private store: Store, public dialog: MatDialog, private sanitizer: DomSanitizer) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.store.dispatch(assetAction.assetLoadRequested());
    this.assets$ = this.store.select(selectAllAssets);
    this.assets$.subscribe((assets) => {
      this.assetLabel = 'Asset list';
      this.allAssets = assets;
      this.allAssets = assets.map((e) => {
        return {
          ...e, filepath: (e.fileType == 'video' && e.filename.match(this.urlRegex))
            ? this.sanitizer.bypassSecurityTrustResourceUrl(e.filepath)
            : e.filepath
        }
      });
      this.setAssets(this.allAssets)
    });
  }

  addAsset(): void {
    this.dialog.open(AddVideoComponent, {});
  }

  editAsset(asset): void {
    const editModal = this.dialog.open(AddVideoComponent, {
      data: asset
    });
    editModal.afterClosed().subscribe(() => {
      this.store.dispatch(assetAction.assetLoadRequested());
    });
  }

  editSubtitles(asset): void {
    // const modal = this.dialog.open(SubtitleManagerModalComponent, {
    //   data: asset
    // });
    // modal.afterClosed().subscribe(() => {
    //   this.store.dispatch(assetAction.assetLoadRequested());
    // });
  }

  deleteObject(asset): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        action: 'Delete',
        message: 'Are you sure you want to delete this file?',
        icon: 'warning',
        color: 'red'
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.result && res.result === 'confirmed') {
        this.store.dispatch(assetAction.assetDeleteRequested({ entry: asset }));
      }
    });
  }

  setAssets(assets) {
    this.assets = assets;
    if(this.assets.length) this.assets = this.assets.sort((a,b) => a.auditoriumNum - b.auditoriumNum)
    this.dataSource = new MatTableDataSource<AssetEntry>(this.assets);
    this.dataSource.sort = this.sort;
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

  changeSelection(event: any) {

    switch (event.value) {
      case 'hall':
        this.setAssets(this.allAssets.filter(e => e.type == 'hall').sort((a, b) => a.assetLocation - b.assetLocation))
        break;
      case 'all':
        this.setAssets(this.allAssets)
        break;
      default:
        const numberVal = +event.value
        this.setAssets(this.allAssets.filter(e => (e.type == 'auditorium' && e.auditoriumNum == numberVal)).sort((a, b) => a.rank - b.rank))
        break;
    }
  }

}
