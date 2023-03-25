import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssetEntry } from 'src/app/core/schemas/asset.schema';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import {
  selectAssetSaving,
  selectAssetLoading,
  selectAssetError,
} from 'src/app/core/store/selectors/asset.selector';
import * as assetAction from '../../../core/store/actions/asset.action';
import { assetUpdateRequested } from '../../../core/store/actions/asset.action';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss'],
})
export class AddVideoComponent implements OnInit {
  public AssetAddForm: FormGroup;

  videoModel = {
    location: '',
    description: '',
    link: '',
  };

  isSaving$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  assets$: Observable<AssetEntry[]>;
  assetsHall: string[];
  invalid = false;
  invalidMessage: string;
  public unsubscribeAll: Subject<boolean>;

  links = ['Video'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  useLink = false;
  fileUrl = '';
  fileName = undefined;

  image = undefined;
  filetypes = ['video', 'image', 'pdf'];

  auditFilename = '';
  urlRegex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  constructor(
    protected store: Store,
    private dialogRef: MatDialogRef<AddVideoComponent>,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: AssetEntry,
    private sanitizer: DomSanitizer
  ) {
    this.AssetAddForm = new FormGroup({
      auditoriumNum: new FormControl('', []),
      fileType: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      rank: new FormControl('', []),
      assetLocation: new FormControl('', [Validators.required]),
    });

    if (data && data._id) {
      this.videoModel = {
        location: data.assetLocation,
        description: data.description,
        link: '',
      };
      
      if ((data.filepath as any)?.changingThisBreaksApplicationSecurity?.match(this.urlRegex)) {
        this.videoModel.link = (data.filepath as any)?.changingThisBreaksApplicationSecurity;
        this.useLink = true;
      }
    }

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

    this.assetsHall = ['1', '2', '3', '4', '5', '6', '7'];
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSubmit(event): void {
    if (!this.videoModel.location) {
      this.snackbarService.openSnackBarAlert('error', 'no location choosen');
    } else {
      let obj;
      if (this.useLink) {
        obj = {
          filepath: this.videoModel.link,
          filename: this.videoModel.link,
          assetLocation: this.videoModel.location,
          description: this.videoModel.description,
          fileType: 'video',
        };
      } else if (event && event.length && !this.useLink) {
        event.forEach((e) => {
          obj = {
            filepath: e.location,
            filename: e.name,
            assetLocation: this.videoModel.location,
            description: this.videoModel.description,
            fileType: 'video',
          };
        });
      }

      if (this.data?._id) {
        this.store.dispatch(
          assetUpdateRequested({
            param: this.data._id,
            body: obj,
          })
        );
      } else {
        this.store.dispatch(
          assetAction.assetSaveRequested({
            input: obj,
          })
        );
      }

      this.isSaving$.subscribe((saving) => {
        if (!saving) {
          this.errorMessage$.subscribe((error) => {
            if (!error) {
              this.dialogRef.close();
            }
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
    this.fileUrl = '';
    this.videoModel = {
      location: '',
      description: '',
      link: '',
    };
  }

  changeLocation() {
    this.fileName = this.AssetAddForm.get('assetLocation').value;
  }

  changeFilename() {
    this.auditFilename = undefined;
    if (this.AssetAddForm.get('auditoriumNum').value) {
      this.auditFilename = `audit${
        this.AssetAddForm.get('auditoriumNum').value
      }`;
    }
  }
}
