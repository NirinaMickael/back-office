import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectOeuvreErrorMessage,selectOeuvreLoading,selectOeuvreSaving } from 'src/app/core/store/selectors/oeuvres.selector';
import { selectAllCategory, selectCategorySaving, selectCategory } from 'src/app/core/store/selectors/category.selector';
import * as oeuvreAction from "../../../core/store/actions/oeuvres.action";
import { ArtistEntry } from 'src/app/core/schemas/artists.schema';
import { CategoryEntry } from 'src/app/core/schemas/caterogy.schema';
import * as CategoryAction from "../../../core/store/actions/category.action"
@Component({
  selector: 'app-oeuvre-add-modal',
  templateUrl: './oeuvre-add-modal.component.html',
  styleUrls: ['./oeuvre-add-modal.component.scss']
})
export class OeuvreAddModalComponent {
  public OeuvreAddForm: FormGroup;
  isSaving$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  invalid = false;
  invalidMessage: string;
  public unsubscribeAll: Subject<boolean>;
  imageUrl !: string;
  isUploaded !:boolean;
  isUploadedImage !:boolean;
  category : CategoryEntry[];
  category$ : Observable<CategoryEntry[]>;
  allArtist$ !:Observable<ArtistEntry[]> ;
  constructor(protected store: Store, private dialogRef: MatDialogRef<OeuvreAddModalComponent> , private formBuilder : FormBuilder) {
    // this.store.dispatch(CategoryAction.categoryLoadRequested());
    this.OeuvreAddForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['',[Validators.required]],
      description : ["",Validators.required],
      objectName:['',Validators.required],
      price : [0,[Validators.required]],
      image : [''],
  });
  this.isUploaded = false;
  this.isUploadedImage = false;
    this.unsubscribeAll = new Subject();
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

  onChangeCategory(e:any){
    this.OeuvreAddForm.controls["category"].setValue(e);
  }
  onSubmit(): void {
    console.log(this.OeuvreAddForm.value);
    if (this.OeuvreAddForm.invalid) return;

    // const newForm = {
    //   ...this.OeuvreAddForm.value,
    //   price: parseFloat(this.OeuvreAddForm.value["price"])
    // }
    console.log(this.OeuvreAddForm.get("price").value)

    this.store.dispatch(oeuvreAction.oeuvreSaveRequested({
      input: this.OeuvreAddForm.value
    }));

    this.isSaving$.subscribe(saving => {
      if (!saving) {
        this.errorMessage$.subscribe(error => {
          if (!error) { this.dialogRef.close(); }
        });
      }
    });
  }
  onUploadFile(e:Event){
    let  file  = e as any;
    console.log(file);
    this.OeuvreAddForm.controls['image'].setValue(file[0].location);
    this.isUploadedImage = true;
  }
  getErrorMessage(champ:string): any {
    return this.OeuvreAddForm.get(champ).hasError(champ) ? `${champ} error` : '';
  }
}
