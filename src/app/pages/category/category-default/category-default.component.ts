import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { CategoryEntry } from 'src/app/core/schemas/caterogy.schema';
import { selectAllCategory, selectCategorySaving, selectCategory } from 'src/app/core/store/selectors/category.selector';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import * as CategoryAction from "../../../core/store/actions/category.action"
@Component({
  selector: 'app-category-default',
  templateUrl: './category-default.component.html',
  styleUrls: ['./category-default.component.scss']
})
export class CategoryDefaultComponent {
  public unsubscirbeAll : Subject<boolean>;
  categorys : CategoryEntry[];
  category$ : Observable<CategoryEntry[]>;
  saving$ : Observable<boolean>;
  category: CategoryEntry;
  displayedColumns: string[];
  displayedColumnsSuperAdminAdmin: string[];
  displayedColumnAdmin : string[] = [
    'name',
    'description',
    'createdAt',
    'actions',
  ];

  dataSource : MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator :MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  categoryLabel : string;
  constructor(public dialog : MatDialog , private store : Store){
    this.unsubscirbeAll = new Subject();
    this.displayedColumnsSuperAdminAdmin = this.displayedColumnAdmin;
    this.displayedColumns = this.displayedColumnAdmin;
  }
  ngOnInit(  ):void{  
    this.store.dispatch(CategoryAction.categoryLoadRequested());
    this.category$ = this.store.select(selectAllCategory);
    this.category$.subscribe((categorys)=>{
      this.categoryLabel = "Category List";
      this.categorys= categorys;
      this.dataSource = new MatTableDataSource<CategoryEntry>(this.categorys);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.saving$ = this.store.select(selectCategorySaving);

    this.store.select(selectCategory).subscribe(res=>{
      if(res){
        this.category = res;
      }
    })
  }
  addCategory(): void {
    this.dialog.open(CategoryAddComponent, {});
  }

  editCategory(category):void{
    const editModal = this.dialog.open(CategoryEditComponent,{
      data:category
    });
    editModal.afterClosed().subscribe(()=>{
      this.store.dispatch(CategoryAction.categoryLoadRequested());
    })
  };

  deleteObject(category) : void{
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        action: 'Delete',
        message: 'Are you sure you want to delete this category?',
        icon: 'warning',
        color: 'red',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.result && res.result === 'confirmed') {
        this.store.dispatch(CategoryAction.categoryDeleteRequested({ entry: category }));
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updateAdminChatStatus(category) {
    // console.log("can chat", user.canChat, !user.canChat)
    this.store.dispatch(CategoryAction.categoryUpdateRequested({
      param: category._id,
      body: {...category}
    }))
  }

  ngOnDestroy():void{
    this.unsubscirbeAll.next();
    this.unsubscirbeAll.complete();
  }
}
