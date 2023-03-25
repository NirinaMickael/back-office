import { EventEmitter, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { UploadService } from 'src/app/core/services/uploads/upload.service';
import { uploadRequested } from 'src/app/core/store/actions/asset.action';
import {
  selectAssetSaving,
  selectAssetError,
  selectAssetUploadState,
} from 'src/app/core/store/selectors/asset.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit, OnDestroy {
  @Input() image;
  @Input() maxFilesize = 600;
  @Input() allowMultipleUpload = false;
  @Input() autoUpload = true;
  @Input() disableUploadIfNoFiles = true;
  @Input() fileTypes = 'video';
  @Input() message = "Click or drag asset here to upload"
  @Input() filename;
  @Output() uploadEvent = new EventEmitter<any>();

  filesToUpload = [];
  uploadedFiles = [];
  uploadStat = {
    totalBytes: 0,
    uploadedFiles: 0,
    uploadPercentage: 0,
    filesInQueue: 0,
    uploadFinished: 0,
  };
  loading = false;

  uploadState$: Observable<any>;
  unsubscribeAll: Subject<boolean>;
  saving$: Observable<boolean>;
  serverError$: Observable<string>;

  config: DropzoneConfigInterface;

  allFiletypes: { value: string; viewValue: string }[] = [
    { value: '.mp4', viewValue: 'video' },
    { value: '.jpg, .png, .jpeg', viewValue: 'image' },
    { value: '.pdf', viewValue: 'pdf' },
    { value: '.mp3', viewValue: 'audio' },
    { value: '.vtt', viewValue: 'subtitle' },
    { value: '.glb', viewValue: 'threejs' }
  ];

  constructor(
    private domSanitizer: DomSanitizer,
    private service: UploadService,
    protected store: Store,
    private snackbarService: SnackbarService
  ) {
    this.unsubscribeAll = new Subject();
    let self = this;
    this.config = {
      url: environment.SERVER_URL + '/api/uploads/',
      maxFilesize: this.maxFilesize,
      acceptedFiles: this.fileTypes,
      addRemoveLinks: true,
      autoProcessQueue: this.autoUpload,
      maxFiles: this.allowMultipleUpload ? 20 : 1,
      init: function () {
        this.on('addedfile', (file) => {
          self.onSelectFile(file);
        });
        this.on('removedfile', (file) => {
          self.onRemoveFile(file);
        });
        this.on('error', function (file, errorMessage) {
          if (file.accepted) {
            let mypreview: any = document.getElementsByClassName('dz-error');
            mypreview = mypreview[mypreview.length - 1];
            mypreview.classList.toggle('dz-error');
            mypreview.classList.toggle('dz-success');
          }
        });
      },
      renameFile: (file) => {
        const fileExt = file.name.split('.').pop();
        const newFilename = this.filename
          ? this.filename + '.' + fileExt
          : file.name
              .substr(0, file.name.lastIndexOf('.'))
              .replace(/[^A-Z0-9]+/gi, '_') +
            '.' +
            fileExt;
        return newFilename;
      },
    };
  }

  ngOnInit(): void {
    console.log('this.allowMultipleUpload', this.allowMultipleUpload);
    this.saving$ = this.store.pipe(
      select(selectAssetSaving),
      takeUntil(this.unsubscribeAll)
    );
    this.serverError$ = this.store.pipe(
      select(selectAssetError),
      takeUntil(this.unsubscribeAll)
    );
    this.uploadState$ = this.store.pipe(
      select(selectAssetUploadState),
      takeUntil(this.unsubscribeAll)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    const type = this.allFiletypes.find(
      (e) => e.viewValue == changes.fileTypes?.currentValue
    );
    console.log("type => ",type);
    this.config.acceptedFiles = type ? type.value : '';

    this.config.renameFile = (file) => {
      const fileExt = file.name.split('.').pop();
      const newFilename = this.filename
        ? this.filename + '.' + fileExt
        : file.name
            .substr(0, file.name.lastIndexOf('.'))
            .replace(/[^A-Z0-9]+/gi, '_') +
          '.' +
          fileExt;
      return newFilename;
    };

    this.config.maxFiles = this.allowMultipleUpload ? 20 : 1;
  }

  onSelectFile(event) {
    const e = {
      uuid: event.upload.uuid,
      file: event,
    };
    this.allowMultipleUpload
      ? this.filesToUpload.push(e)
      : (this.filesToUpload[0] = e);

    if (this.autoUpload) {
      this.config.renameFile(e.file);
      const newFilename = this.renameFileConference(e.file);

      const uploaded = {
        location: environment.SERVER_URL + '/public/upload/' + newFilename,
        name: newFilename,
      };

      this.allowMultipleUpload
        ? this.uploadedFiles.push(uploaded)
        : (this.uploadedFiles[0] = uploaded);
    }
  }

  onRemoveFile(event) {
    const index = this.filesToUpload.findIndex(
      (e) => e.uuid == event.upload.uuid
    );
    if (index) this.filesToUpload.splice(index, 1);
    
  }

  upload(): void {
    const formData = new FormData();
    if (!this.autoUpload && this.filesToUpload.length) {
      this.filesToUpload.forEach((e, i) => {
        this.uploadStat.totalBytes = e.file.size;
        this.uploadStat.filesInQueue++;
        this.config.renameFile(e.file);
        const newFilename = this.renameFileConference(e.file);
        formData.append('file', e.file, newFilename);
        this.loading = true;

        this.store.dispatch(
          uploadRequested({
            input: formData,
          })
        );
        this.uploadedFiles.push({
          location: environment.SERVER_URL + '/public/upload/' + newFilename,
          name: newFilename,
        });
      });
    } else if (this.autoUpload) {
      this.uploadEvent.emit(this.uploadedFiles);
    }

    this.uploadState$.subscribe((b) => {
      if (b?.type == 3 && this.uploadStat.uploadFinished == 0) {
        this.uploadEvent.emit(this.uploadedFiles);
        this.loading = false;
        this.uploadStat = {
          totalBytes: 0,
          uploadedFiles: 0,
          uploadPercentage: 0,
          filesInQueue: 0,
          uploadFinished: 2,
        };
      }

      if (b?.type == 0) {
        this.uploadStat.uploadPercentage = +(
          (b / this.uploadStat.totalBytes) *
          100
        ).toFixed(2);
      } else if (b?.type >= this.uploadStat.filesInQueue) {
        this.uploadStat.uploadedFiles++;
        this.uploadStat.uploadPercentage = 0;
      }
    });

    this.serverError$.subscribe((err) => {
      if (err) {
        this.loading = false;
        this.snackbarService.openSnackBarAlert('error', err);
      }
    });
  }

  findInArrayOfFiles(arrayOfFiles, filename) {
    let result = undefined;
    if (arrayOfFiles) {
      const index = arrayOfFiles.findIndex((e) => e.name == filename);
      if (index >= 0) {
        result = {
          index,
          file: arrayOfFiles[index],
        };
      }
    }
    return result;
  }

  onUploadError(event) {}

  onUploadSuccess(event) {}

  renameFileConference(file): string {
    const fileExt = file.name.split('.').pop();

    const newFilename = this.filename
      ? this.filename + '.' + fileExt
      : file.name
          .substr(0, file.name.lastIndexOf('.'))
          .replace(/[^A-Z0-9]+/gi, '_') +
        '.' +
        fileExt;

    return newFilename;
  }
}
