import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssetEntry } from 'src/app/core/schemas/asset.schema';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { assetUpdateRequested } from 'src/app/core/store/actions/asset.action';
import { selectAssetError, selectAssetLoading, selectAssetSaving } from 'src/app/core/store/selectors/asset.selector';

@Component({
  selector: 'app-asset-edit-modal',
  templateUrl: './asset-edit-modal.component.html',
  styleUrls: ['./asset-edit-modal.component.scss']
})
export class AssetEditModalComponent implements OnInit {

  public AssetEditForm: FormGroup;
  isSaving$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  assets$: Observable<AssetEntry[]>;
  assetsHall: string[];
  invalid = false;
  invalidMessage: string;
  public unsubscribeAll: Subject<boolean>;

  // links = ['Teaser', 'Intro', 'Hall', 'Auditorium'];
  links = ['Hall', 'Auditorium'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  useLink = false
  fileUrl = ''
  fileName = undefined

  image = undefined
  filetypes = [
    'video',
    'image',
    'pdf',
  ];
  auditFilename = ''

  constructor(
    protected store: Store,
    private dialogRef: MatDialogRef<AssetEditModalComponent>,
    private snackbarService: SnackbarService,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: AssetEntry,
  ) {
    this.AssetEditForm = new FormGroup({
      auditoriumNum: new FormControl(data.auditoriumNum, []),
      fileType: new FormControl(data.fileType, [Validators.required]),
      description: new FormControl(data.description, []),
      rank: new FormControl(data.rank, []),
      assetLocation: new FormControl(data.assetLocation, [Validators.required]),
    });

    this.activeLink = data.type
    
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.fileName = this.AssetEditForm.get('assetLocation').value

    this.auditFilename = undefined
    if (this.AssetEditForm.get('auditoriumNum').value) {
      this.auditFilename = `audit${this.AssetEditForm.get('auditoriumNum').value}`
    }

    this.isSaving$ = this.store.pipe(
      select(selectAssetSaving),
      takeUntil(this.unsubscribeAll)
    );

    this.loading$ = this.store.pipe(
      select(selectAssetLoading),
      takeUntil(this.unsubscribeAll)
    );

    this.errorMessage$ = this.store.pipe(
      select(selectAssetError),
      takeUntil(this.unsubscribeAll)
    );

    this.assetsHall = [
      '1', '2', '3', '4', '5', '6', '7'
    ]
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSubmit(event): void {

    if (this.data.type == 'hall' && this.AssetEditForm.get('assetLocation').invalid) {
      this.snackbarService.openSnackBarAlert('error', 'no location choosen')
    } else if (this.data.type == 'auditorium'
      && this.AssetEditForm.get('fileType').invalid
    ) {
      this.snackbarService.openSnackBarAlert('error', 'no file type choosen')
    } else if (this.data.type == 'auditorium'
      && this.AssetEditForm.get('fileType').value == 'video'
      && !this.AssetEditForm.get('auditoriumNum').value
      && !this.AssetEditForm.get('rank').value
    ) {
      this.snackbarService.openSnackBarAlert('error', 'invalid auditorium/rank')
    } else {
      let obj
      // if (this.useLink) {
      //   obj = {
      //     auditoriumNum: this.AssetEditForm.get('auditoriumNum').value,
      //     filepath: this.fileUrl,
      //     filename: this.fileUrl,
      //     description: this.AssetEditForm.get('description').value,
      //     fileType: this.data.type == 'hall' ? 'video' : this.AssetEditForm.get('fileType').value,
      //     rank: this.AssetEditForm.get('rank').value,
      //     type: this.data.type == 'hall' ? 'hall' : 'auditorium',
      //     ...(this.AssetEditForm.get('assetLocation').value ? { assetLocation: this.AssetEditForm.get('assetLocation').value } : {}),
      //     _id: this.data._id,
      //   }
      //   this.store.dispatch(assetUpdateRequested({
      //     param: this.data._id,
      //     body: obj
      //   }));
      // }

      if (!this.useLink) {
        event.forEach(e => {
          obj = {
            auditoriumNum: this.AssetEditForm.get('auditoriumNum').value,
            filepath: e.location,
            filename: e.name,
            description: this.AssetEditForm.get('description').value,
            fileType: this.data.type == 'hall' ? 'video' : this.AssetEditForm.get('fileType').value,
            rank: this.AssetEditForm.get('rank').value,
            type: this.data.type.toLowerCase(),
            ...(this.AssetEditForm.get('assetLocation').value ? { assetLocation: this.AssetEditForm.get('assetLocation').value } : {}),
            _id: this.data._id,
          }
          this.store.dispatch(assetUpdateRequested({
            param: this.data._id,
            body: obj
          }));
        });

        if (!event || !event.length) {
          obj = {
            auditoriumNum: this.AssetEditForm.get('auditoriumNum').value,
            description: this.AssetEditForm.get('description').value,
            fileType: this.data.type == 'hall' ? 'video' : this.AssetEditForm.get('fileType').value,
            rank: this.AssetEditForm.get('rank').value,
            type: this.data.type.toLocaleLowerCase(),
            _id: this.data._id,
          }
          this.store.dispatch(assetUpdateRequested({
            param: this.data._id,
            body: obj
          }));
        }
      }

      this.isSaving$.subscribe(saving => {
        if (!saving) {
          this.errorMessage$.subscribe(error => {
            if (!error) { this.dialogRef.close(); }
          });
        }
      });
    }

  }

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }

  changeFilename() {
    this.auditFilename = undefined
    if (this.AssetEditForm.get('auditoriumNum').value) {
      this.auditFilename = `audit${this.AssetEditForm.get('auditoriumNum').value}`
    }
  }
}
