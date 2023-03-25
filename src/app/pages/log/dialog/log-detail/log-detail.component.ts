import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.scss']
})
export class LogDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
    public next: any;
    public latest: any;
  ngOnInit(): void {
    const objNone = {value: 'None'};
    this.next = !this.data.detail.next ? objNone : JSON.parse(this.data.detail.next)
    this.latest = !this.data.detail.latest ? objNone : JSON.parse(this.data.detail.latest)
  }

}

export interface DialogData {
  detail: DetailDialog;
}

export interface DetailDialog {
  success: boolean;
  _id: string;
  action: string;
  domain: string;
  email: string;
  latest: string;
  next: string;
  detail: any;
}

export interface ILatest {
  latest: string;
}

export interface INext {
  new: string
}