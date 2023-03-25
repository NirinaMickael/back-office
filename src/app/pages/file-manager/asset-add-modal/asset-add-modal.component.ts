import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssetEntry } from 'src/app/core/schemas/asset.schema';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { selectAllAssets, selectAssetError, selectAssetLoading, selectAssetSaving } from 'src/app/core/store/selectors/asset.selector';
import * as assetAction from '../../../core/store/actions/asset.action';

@Component({
  selector: 'app-asset-add-modal',
  templateUrl: './asset-add-modal.component.html',
  styleUrls: ['./asset-add-modal.component.scss']
})
export class AssetAddModalComponent implements OnInit {

  public AssetAddForm: FormGroup;
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
    private dialogRef: MatDialogRef<AssetAddModalComponent>,
    private snackbarService: SnackbarService,
    private sanitizer: DomSanitizer
  ) {
    this.AssetAddForm = new FormGroup({
      auditoriumNum: new FormControl('', []),
      fileType: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      rank: new FormControl('', []),
      assetLocation: new FormControl('', [Validators.required]),
    });
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
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

    if (this.activeLink == 'Hall' && this.AssetAddForm.get('assetLocation').invalid) {
      this.snackbarService.openSnackBarAlert('error', 'no location choosen')
    }
    // else if (this.activeLink == 'Auditorium'
    //   && this.AssetAddForm.get('fileType').invalid
    // ) {
    //   this.snackbarService.openSnackBarAlert('error', 'no file type choosen')
    // } 
    // else if (this.activeLink == 'Auditorium'
    //   && this.AssetAddForm.get('fileType').value == 'video'
    //   && !this.AssetAddForm.get('auditoriumNum').value
    //   && !this.AssetAddForm.get('rank').value
    // ) 
    // {
    //   this.snackbarService.openSnackBarAlert('error', 'invalid auditorium/rank')
    // } 
    else {
      let obj
      // if (this.useLink) {
      //   obj = {
      //     auditoriumNum: this.AssetAddForm.get('auditoriumNum').value,
      //     filepath: this.fileUrl,
      //     filename: this.fileUrl,
      //     description: this.AssetAddForm.get('description').value,
      //     // fileType: this.activeLink == 'Hall' ? 'video' : this.AssetAddForm.get('fileType').value,
      //     fileType: 'video',
      //     rank: this.AssetAddForm.get('rank').value,
      //     type: this.activeLink == 'Hall' ? 'hall' : 'auditorium',
      //     ...(this.AssetAddForm.get('assetLocation').value ? { assetLocation: this.AssetAddForm.get('assetLocation').value } : {}),
      //   }
      //   this.store.dispatch(assetAction.assetSaveRequested({
      //     input: obj
      //   }));
      // }

      if (event && event.length && !this.useLink) {
        event.forEach(e => {
          obj = {
            auditoriumNum: this.AssetAddForm.get('auditoriumNum').value,
            filepath: e.location,
            filename: e.name,
            description: this.AssetAddForm.get('description').value,
            // fileType: this.activeLink == 'Hall' ? 'video' : this.AssetAddForm.get('fileType').value,
            fileType: 'video',
            rank: this.AssetAddForm.get('rank').value,
            type: this.activeLink.toLowerCase(),
            ...(this.AssetAddForm.get('assetLocation').value ? { assetLocation: this.AssetAddForm.get('assetLocation').value } : {}),
          }
          this.store.dispatch(assetAction.assetSaveRequested({
            input: obj
          }));
        });
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

  resetAllForm() {
    this.fileUrl = ''
    this.AssetAddForm = new FormGroup({
      auditoriumNum: new FormControl('', []),
      fileType: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      rank: new FormControl('', []),
      assetLocation: new FormControl('', [Validators.required]),
    });
  }

  changeLocation() {
    this.fileName = this.AssetAddForm.get('assetLocation').value
  }

  changeFilename() {
    this.auditFilename = undefined
    if (this.AssetAddForm.get('auditoriumNum').value) {
      this.auditFilename = `audit${this.AssetAddForm.get('auditoriumNum').value}`
    }
  }
}
