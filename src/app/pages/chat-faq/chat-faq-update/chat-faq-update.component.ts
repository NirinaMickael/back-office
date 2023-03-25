import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatFaqEntry } from 'src/app/core/schemas/chat-faq.schema';
import { chatFaqUpdateRequested } from 'src/app/core/store/actions/chat-faq.action';
import { selectChatFaqSaving } from 'src/app/core/store/selectors/chat-faq.selector';

@Component({
  selector: 'app-chat-faq-update',
  templateUrl: './chat-faq-update.component.html',
  styleUrls: ['./chat-faq-update.component.scss'],
})
export class ChatFaqUpdateComponent implements OnInit, OnDestroy {
  public unsubscribeAll: Subject<boolean>;
  ChatFaqForm: FormGroup;
  saving$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChatFaqEntry,
    private store: Store,
    private dialogRef: MatDialogRef<ChatFaqUpdateComponent>
  ) {
    this.unsubscribeAll = new Subject();
    this.ChatFaqForm = new FormGroup({
      question: new FormControl(data.question, Validators.required),
      answer: new FormControl(data.answer, Validators.required),
    });
  }

  ngOnInit(): void {
    this.saving$ = this.store
      .select(selectChatFaqSaving)
      .pipe(takeUntil(this.unsubscribeAll));
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSubmit() {
    if (this.ChatFaqForm.invalid) return;

    this.store.dispatch(
      chatFaqUpdateRequested({
        param: this.data._id,
        body: this.ChatFaqForm.value,
      })
    );

    this.saving$.subscribe((saving) => {
      if (!saving) {
        this.dialogRef.close();
      }
    });
  }
}
