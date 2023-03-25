import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as scoreAction from 'src/app/core/store/actions/score.action';
import { selectAllScores, selectScoreWithTotal } from 'src/app/core/store/selectors/score.selector';
import { ScoreEntry } from 'src/app/core/schemas/score.schema';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.scss']
})
export class ScoreListComponent implements OnInit {
  datasource$: Observable<ScoreEntry[]>;
  public rows: any;
  temp = [];
  ColumnMode: ColumnMode;
  //columns = [{ prop: 'user', name: 'User' }, { prop: 'game_1', name: 'Game 1' }, { prop: 'game_2', name: 'Game 2' }, { prop: 'game_3', name: 'Game 3' }, { prop: 'game_4', name: 'Game 4' }, { prop: 'total',name: 'Total' }];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private store: Store ) {
    this.store.select(selectScoreWithTotal).subscribe((result: any) => {
      this.rows = result;
      this.temp = [...result];
    })
    this.store.dispatch(scoreAction.scoreLoadRequested());
  }

  ngOnInit(): void {
  }

  updateFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    // filter our data
    const temp = this.temp.filter((d) => {
      return d.user.toLowerCase().indexOf(filterValue) !== -1 || !filterValue;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
