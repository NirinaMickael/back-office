import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssetEntry } from 'src/app/core/schemas/asset.schema';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { assetUpdateRequested } from 'src/app/core/store/actions/asset.action';
import { selectAssetSaving, selectAssetLoading, selectAssetError } from 'src/app/core/store/selectors/asset.selector';

@Component({
  selector: 'app-subtitle-manager-modal',
  templateUrl: './subtitle-manager-modal.component.html',
  styleUrls: ['./subtitle-manager-modal.component.scss']
})
export class SubtitleManagerModalComponent implements OnInit {

  public form: FormGroup;
  isSaving$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  assets$: Observable<AssetEntry[]>;
  invalidMessage: string;
  public unsubscribeAll: Subject<boolean>;
  subtitleInEdition: any;
  deleting = undefined
  filename: string

  constructor(protected store: Store,
    private dialogRef: MatDialogRef<SubtitleManagerModalComponent>,
    private snackbarService: SnackbarService,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: AssetEntry,
  ) {
    this.form = new FormGroup({
      language: new FormControl('', [Validators.required]),
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
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  edit(item): void {
    this.filename = undefined
    this.subtitleInEdition = this.subtitleInEdition?._id == item._id ? undefined : item
    if(item.filename) this.filename = item.filename.split('.')[0]
  }

  onSubmitAdd(event): void {

    if (this.data.subtitles && this.data.subtitles.length && this.data.subtitles.find(e => e.language == this.form.get('language').value)) {
      this.snackbarService.openSnackBarAlert('error', 'Language already set')
    } else {
      if (this.form.valid && event && event.length) {
        event.forEach(e => {
          const obj = JSON.parse(JSON.stringify(this.data))
          const subtitleObj = {
            language: this.form.get('language').value,
            filename: e.name,
            filePath: e.location,
            fileType: 'audio',
          }
          if (this.data.subtitles && this.data.subtitles.length) {
            obj.subtitles.push(subtitleObj)
          } else {
            obj.subtitles = [subtitleObj]
          }

          if (this.data._id) {
            this.store.dispatch(assetUpdateRequested({
              body: obj,
              param: this.data._id
            }));

            this.isSaving$.subscribe(saving => {
              if (!saving) {
                this.errorMessage$.subscribe(error => {
                  if (!error) { this.dialogRef.close(); }
                });
              }
            });
          }
        });
      }
    }
  }

  onSubmitEdit(event): void {

    if (this.subtitleInEdition && event && event.length) {
      event.forEach(e => {
        const obj = JSON.parse(JSON.stringify(this.data))
        const subtitleIndex = obj.subtitles?.findIndex(el => el.language == this.subtitleInEdition.language)
        const subtitleObj = {
          language: this.subtitleInEdition.language,
          filePath: e.location,
          filename: e.name,
        }
        if (this.data._id && subtitleIndex != -1 && obj.subtitles[subtitleIndex]) {
          obj.subtitles[subtitleIndex] = subtitleObj
          this.store.dispatch(assetUpdateRequested({
            body: obj,
            param: this.data._id
          }));

          this.isSaving$.subscribe(saving => {
            if (!saving) {
              this.errorMessage$.subscribe(error => {
                if (!error) { this.dialogRef.close(); }
              });
            }
          });
        }
      });
    }
  }

  delete(item): void {
    this.deleting = item
    const obj = JSON.parse(JSON.stringify(this.data))
    const subtitleIndex = obj.subtitles?.findIndex(e => e.language == item.language)
    if (this.data._id && subtitleIndex != -1) {
      obj.subtitles.splice(subtitleIndex, 1)
      this.store.dispatch(assetUpdateRequested({
        body: obj,
        param: this.data._id
      }));

      this.isSaving$.subscribe(saving => {
        if (!saving) {
          this.errorMessage$.subscribe(error => {
            if (!error) { this.dialogRef.close(); }
            else this.deleting = undefined
          });
        }
      });
    } else this.deleting = undefined
  }

  renameFile(): void {
    this.filename = undefined
    if (this.data?.filename && this.form.get('language').value) {
      this.filename = `${this.data.filename.split('.')[0]}-${this.form.get('language').value.toUpperCase()}`
    }
  }
}
