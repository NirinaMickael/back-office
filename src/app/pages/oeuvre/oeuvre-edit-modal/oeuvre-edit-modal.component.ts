import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArtistEntry } from 'src/app/core/schemas/artists.schema';
import { CategoryEntry } from 'src/app/core/schemas/caterogy.schema';
import { OeuvreEntry } from 'src/app/core/schemas/oeuvre.schema';
import { oeuvreUpdateRequested } from 'src/app/core/store/actions/oeuvres.action';
import { selectAllArtists } from 'src/app/core/store/selectors/artists.selector';
import { selectAllCategory } from 'src/app/core/store/selectors/category.selector';
import { selectOeuvreErrorMessage, selectOeuvreLoading, selectOeuvreSaving } from 'src/app/core/store/selectors/oeuvres.selector';
import * as artistAction from "../../../core/store/actions/artists.action";
import * as CategoryAction from "../../../core/store/actions/category.action"
@Component({
  selector: 'app-oeuvre-edit-modal',
  templateUrl: './oeuvre-edit-modal.component.html',
  styleUrls: ['./oeuvre-edit-modal.component.scss']
})
export class OeuvreEditModalComponent implements OnInit{
  public OeuvreEditForm: FormGroup;
  isSaving$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  invalid = false;
  invalidMessage: string;
  public unsubscribeAll: Subject<boolean>;
  isUploaded !: boolean;
  isUploadedImage !:boolean;
  category : CategoryEntry[];
  category$ : Observable<CategoryEntry[]>;
  allArtist$ !:Observable<ArtistEntry[]> ;
  public modeselect:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: OeuvreEntry, protected store: Store, private dialogRef: MatDialogRef<OeuvreEditModalComponent> , private formBuilder : FormBuilder) { 
    this.OeuvreEditForm = this.formBuilder.group({
      name: [data.name, [Validators.required]],
      catergoryId : [data.categoryId,[Validators.required]],
      description  : [data.description],
      price : [data.price,[Validators.required]],
      objectName:[data.objectName,[Validators.required]],
      image : [''],
  });
  this.modeselect = data.name;
    this.unsubscribeAll = new Subject();
    // this.store.dispatch(artistAction.artistLoadRequested())
    // // this.allArtist$ = this.store.select(selectAllArtists);
    // this.allArtist$ = this.store.select(selectAllArtists);
  }

  ngOnInit(): void {
    this.store.dispatch(CategoryAction.categoryLoadRequested());
    this.category$ = this.store.select(selectAllCategory);
    this.category$.subscribe((categorys)=>{
      this.category = categorys;
    });
    this.isSaving$ = this.store.pipe(
      select(selectOeuvreSaving),
      takeUntil(this.unsubscribeAll)
    );

    this.loading$ = this.store.pipe(
      select(selectOeuvreLoading),
      takeUntil(this.unsubscribeAll)
    );

    this.errorMessage$ = this.store.pipe(
      select(selectOeuvreErrorMessage),
      takeUntil(this.unsubscribeAll)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSubmit(): void {
    if (this.OeuvreEditForm.status === 'VALID') {
      this.store.dispatch(
        oeuvreUpdateRequested({
          param: this.data._id,
          body: {
            ...this.OeuvreEditForm.value,
          },
        })
      );
      this.isSaving$.subscribe((saving) => {
        if (!saving) {
          this.errorMessage$.subscribe(error => {
            if (!error) {
              this.dialogRef.close();
            }
          });
        }
      });
    }
  }
  onUploadFile(e: Event){
    let  file  = e as any;
    this.OeuvreEditForm.controls['image'].setValue(file[0].location);
    this.isUploadedImage = true;
  } 
  getErrorMessage(champ:string): any {
    return this.OeuvreEditForm.get(champ).hasError('required') ?`the ${champ}  is required` : "error";
  }
  /*
  onUploadFiles(e:Event){
    let  file  = e as any;
    // file = file.map((e:any)=>e.location)
    this.OeuvreEditForm.controls['images'].setValue(file);
    this.isUploadedImage = true;
  }
  */
}
