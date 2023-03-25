import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { OeuvreEntry } from 'src/app/core/schemas/oeuvre.schema';
import { OeuvreAddModalComponent } from '../oeuvre-add-modal/oeuvre-add-modal.component';
import * as OeuvreAction from "../../../core/store/actions/oeuvres.action";

import { selectAllOeuvres , selectOeuvreSaving} from 'src/app/core/store/selectors/oeuvres.selector';
import { selectOeuvre } from 'src/app/core/store/selectors/oeuvres.selector';
import { OeuvreEditModalComponent } from '../oeuvre-edit-modal/oeuvre-edit-modal.component';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { CategoryEntry } from 'src/app/core/schemas/caterogy.schema';
import { selectAllCategory } from 'src/app/core/store/selectors/category.selector';
@Component({
  selector: 'app-oeuvre-default',
  templateUrl: './oeuvre-default.component.html',
  styleUrls: ['./oeuvre-default.component.scss']
})
export class OeuvreDefaultComponent implements OnInit{
  public unsubscirbeAll : Subject<boolean>;
  oeuvres : OeuvreEntry[];
  oeuvre$ : Observable<OeuvreEntry[]>;
  saving$ : Observable<boolean>;
  oeuvre: OeuvreEntry;

  displayedColumns: string[];
  displayedColumnsSuperAdminAdmin: string[];
  displayedColumnAdmin : string[] = [
    'name',
    'category',
    'description',
    'price',
    'image',
    'actions',
  ];

  dataSource : MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator :MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  oeuvreLabel : string;
  constructor(public dialog : MatDialog , private store : Store){
    this.unsubscirbeAll = new Subject();
    this.displayedColumnsSuperAdminAdmin = this.displayedColumnAdmin;
    this.displayedColumns = this.displayedColumnAdmin;
  }
  ngOnInit(  ):void{  
    this.store.dispatch(OeuvreAction.oeuvreLoadRequested());
    this.oeuvre$ = this.store.select(selectAllOeuvres);
    this.oeuvre$.subscribe((oeuvres)=>{
      this.oeuvreLabel = "Product List";
      console.log(oeuvres);
      this.oeuvres= oeuvres;
      this.dataSource = new MatTableDataSource<OeuvreEntry>(this.oeuvres);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.saving$ = this.store.select(selectOeuvreSaving);

    this.store.select(selectOeuvre).subscribe(res=>{
      if(res){
        this.oeuvre = res;
      }
    })
  }
  addOeuvre(): void {
    this.dialog.open(OeuvreAddModalComponent, {});
  }

  editOeuvre(oeuvre):void{
    const editModal = this.dialog.open(OeuvreEditModalComponent,{
      data:oeuvre
    });
    editModal.afterClosed().subscribe(()=>{
      this.store.dispatch(OeuvreAction.oeuvreLoadRequested());
    })
  };

  deleteObject(oeuvre) : void{
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        action: 'Delete',
        message: 'Are you sure you want to delete this oeuvre?',
        icon: 'warning',
        color: 'red',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.result && res.result === 'confirmed') {
        this.store.dispatch(OeuvreAction.oeuvreDeleteRequested({ entry: oeuvre }));
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
  updateAdminChatStatus(oeuvre) {
    // console.log("can chat", user.canChat, !user.canChat)
    this.store.dispatch(OeuvreAction.oeuvreUpdateRequested({
      param: oeuvre._id,
      body: {...oeuvre}
    }))
  }

  ngOnDestroy():void{
    this.unsubscirbeAll.next();
    this.unsubscirbeAll.complete();
  }
}
