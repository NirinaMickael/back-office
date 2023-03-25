import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SectionEntry } from 'src/app/core/schemas/section.schema';
import {
  selectSectionSaving,
  selectSectionError,
  selectAllSections,
} from 'src/app/core/store/selectors/section.selector';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { environment } from 'src/environments/environment';
import * as sectionAction from '../../core/store/actions/sections.action';
@Component({
  selector: 'app-section-manager',
  templateUrl: './section-manager.component.html',
  styleUrls: ['./section-manager.component.scss'],
})
export class SectionManagerComponent implements OnInit {
  editMode: any;
  selectedContent = undefined;
  selectedSubContent = undefined;
  addMode: any;

  sections$: Observable<SectionEntry[]>;
  sections: SectionEntry[];
  loadVariantImages = false;
  count: number = 0;
  isSaving$: Observable<boolean>;
  errorMessage$: Observable<string>;

  serverPublicPath = environment.SERVER_URL + '/public/upload';

  editorConfig: AngularEditorConfig;

  public unsubscribeAll: Subject<boolean>;

  constructor(
    private sanitized: DomSanitizer,
    private store: Store,
    public dialog: MatDialog
  ) {
    this.unsubscribeAll = new Subject();
    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
        { class: 'calibri', name: 'Calibri' },
        { class: 'comic-sans-ms', name: 'Comic Sans MS' },
      ],
      customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText',
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadUrl: 'v1/image',
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
    };

    this.editMode = undefined;
  }

  ngOnInit(): void {
    this.retrieveData();

    this.isSaving$ = this.store.pipe(
      select(selectSectionSaving),
      takeUntil(this.unsubscribeAll)
    );

    this.errorMessage$ = this.store.pipe(
      select(selectSectionError),
      takeUntil(this.unsubscribeAll)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  doubleClick(id: string, field: string) {
    this.editMode = {
      id,
      field,
    };
  }

  edit(section: any) {
    this.editMode = undefined;

    section.contents?.forEach((el, ind) => {
      if (!el.title) {
        section.contents.splice(ind, 1);
      }
      if (el._id && el._id.indexOf('Content') != -1) {
        delete el._id;
      }
      el.subtitles?.forEach((e, i) => {
        if (!e.title) {
          el.subtitles.splice(i, 1);
        }
        if (e._id && e._id.indexOf('Content') != -1) {
          delete e._id;
        }
      });
    });

    if (section._id) {
      this.store.dispatch(
        sectionAction.sectionUpdateRequested({
          param: section._id,
          body: section,
        })
      );
    } else {
      this.store.dispatch(
        sectionAction.sectionSaveRequested({
          input: section,
        })
      );
    }
    this.isSaving$.subscribe((saving) => {
      if (!saving) {
        this.errorMessage$.subscribe((error) => {
          if (!error) {
            this.retrieveData();
          }
        });
      }
    });
  }

  selectContent(index: number, content: any) {
    this.selectedContent = {
      index,
      content,
    };
    this.selectedSubContent = undefined;
  }

  selectSubContent(index: number, index2: number, subContent: any) {
    this.selectedSubContent = {
      index,
      index2,
      subContent,
    };
  }

  clickAdd(type: string, object: any) {
    switch (type) {
      case 'content':
        if (!object.contents.length) object.contents = [];
        const newContent = {
          _id: 'newContent-' + (object.contents.length + 1),
          title: 'content title',
          image: '',
          subtitles: [],
        };
        object.contents.push(newContent);
        this.doubleClick(newContent._id, 'title');
        break;
      case 'subContent':
        if (!object.subtitles.length) object.subtitles = [];
        const newSubContent = {
          _id: 'newSubContent-' + (object.subtitles.length + 1),
          title: 'sub-content title',
          image: '',
          description: '',
        };
        object.subtitles.push(newSubContent);
        this.doubleClick(newSubContent._id, 'title');
        break;
      default:
        break;
    }
  }

  onUploadImage(event: any, object: any, section) {
    if (event && event.length) {
      event.forEach((e) => {
        object.image = e.name;
      });
      this.editMode = undefined;
      this.edit(section);
    }
  }

  retrieveData(): void {
    this.store.dispatch(sectionAction.sectionLoadRequested());
    this.sections$ = this.store.select(selectAllSections);
    this.sections$.subscribe((sections) => {
      if (sections && sections.length) {
        this.sections = JSON.parse(JSON.stringify(sections));
        this.selectedContent = undefined;
        this.selectedSubContent = undefined;
      }
    });
  }

  add() {
    this.sections.push({
      number: '00',
      title: 'title',
      image: undefined,
    });
  }

  delete(section) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        action: 'Delete',
        message: 'Are you sure you want to delete this section?',
        icon: 'warning',
        color: 'red',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.result && res.result === 'confirmed') {
        this.store.dispatch(
          sectionAction.sectionDeleteRequested({
            entry: section,
          })
        );
      }
    });
  }
}
