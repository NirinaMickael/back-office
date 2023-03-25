import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { ScoreEntry } from 'src/app/core/schemas/score.schema';
import { selectScoreWithTotal } from 'src/app/core/store/selectors/score.selector';
import * as scoreAction from 'src/app/core/store/actions/score.action';
import { ThemePalette } from '@angular/material/core';
import { UserEntry } from 'src/app/core/schemas/users.schema';
import { selectAllUsers } from 'src/app/core/store/selectors/users.selector';
import { userLoadRequested } from 'src/app/core/store/actions/users.action';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, OnDestroy {

  public unsubscribeAll: Subject<boolean>;

  links = ['Leaderboard', 'Leaderboard Details', 'Game 1', 'Game 2', 'Game 3', 'Game 4'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  scores$: Observable<ScoreEntry[]>;
  users$: Observable<UserEntry[]>;
  scores: any
  game1_details: any = { scores: [], avg: undefined, avg_time: undefined }
  game2_details: any = { scores: [], avg: undefined, avg_time: undefined }
  game3_details: any = { scores: [], avg: undefined, avg_time: undefined }
  game4_details: any = { scores: [], avg: undefined, avg_time: undefined }
  leaderboard = []
  avg: any
  avg_time: any
  users = []

  constructor(private store: Store) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {

    this.store.dispatch(scoreAction.scoreLoadRequested());
    this.store.dispatch(userLoadRequested());
    this.scores$ = this.store.select(selectScoreWithTotal);
    this.users$ = this.store.select(selectAllUsers);
    this.scores$.subscribe((scores) => {
      this.initTables(scores);
    });
    this.users$.subscribe(users => {
      if (users) this.users = users.filter(e => e.role == 'visitor')
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }

  initTables(scores: ScoreEntry[]): void {
    this.scores = scores.sort((a, b) => b.total - a.total);
    this.avg = this.calcAvg(this.scores.map(e => e.total))
    this.game1_details.scores = scores.filter(el => el.game_1?.score).map(function (e) {
      return {
        _id: e._id,
        user: e.user,
        createdAt: e.createdAt,
        score: e.game_1.score,
        time: e.game_1.time,
      }
    }).sort((a, b) => b.score - a.score)
    this.game1_details.avg = this.calcAvg(this.game1_details.scores.map(e => e.score))
    this.game1_details.avg_time = this.calcAvg(this.game1_details.scores.map(e => e.time), true)
    this.game2_details.scores = scores.filter(el => el.game_2?.score).map(function (e) {
      return {
        _id: e._id,
        user: e.user,
        createdAt: e.createdAt,
        score: e.game_2.score,
        time: e.game_2.time,
      }
    }).sort((a, b) => b.score - a.score)
    this.game2_details.avg = this.calcAvg(this.game2_details.scores.map(e => e.score))
    this.game2_details.avg_time = this.calcAvg(this.game2_details.scores.map(e => e.time), true)
    this.game3_details.scores = scores.filter(el => el.game_3?.score).map(function (e) {
      return {
        _id: e._id,
        user: e.user,
        createdAt: e.createdAt,
        score: e.game_3.score,
        time: e.game_3.time,
        score_details: e.game_3.score_details,
      }
    }).sort((a, b) => b.score - a.score)
    this.game3_details.avg = this.calcAvg(this.game3_details.scores.map(e => e.score))
    this.game3_details.avg_time = this.calcAvg(this.game3_details.scores.map(e => e.time), true)
    this.game4_details.scores = scores.filter(el => el.game_4?.score).map(function (e) {
      return {
        _id: e._id,
        user: e.user,
        createdAt: e.createdAt,
        score: e.game_4.score,
        time: e.game_4.time,
        score_details: e.game_4.score_details,
      }
    }).sort((a, b) => b.score - a.score)
    this.game4_details.avg = this.calcAvg(this.game4_details.scores.map(e => e.score))
    this.game4_details.avg_time = this.calcAvg(this.game4_details.scores.map(e => e.time), true)
    this.leaderboard = scores.map(function (e) { return { ...e, score: e.total } }).sort((a, b) => b.score - a.score)
  }

  calcAvg(array, noFloat?: boolean): string {
    if (!array || !array.length) return undefined
    const average = array.reduce((a, b) => a + b) / array.length;
    return noFloat ? average.toFixed(0) : average.toFixed(2)
  }
}
