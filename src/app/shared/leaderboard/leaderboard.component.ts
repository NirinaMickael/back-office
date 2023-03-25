import { Component, Input, OnInit } from '@angular/core';
import { ScoreEntry } from 'src/app/core/schemas/score.schema';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  @Input() data: { user: string, score: number, time: number, _id: string }[] = []
  @Input() hideTime = false

  constructor() { }

  ngOnInit(): void {
    
  }

}
