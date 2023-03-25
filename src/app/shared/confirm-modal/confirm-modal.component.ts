import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ConfirmModalComponent>
  ) { }

  ngOnInit(): void {
  }

  cancelAction(): any {
    this.dialogRef.close({ result: 'canceled' });
  }

  doAction(): any {
    this.dialogRef.close({ result: 'confirmed' });
  }

}
