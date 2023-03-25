import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { chatFaqSaveRequested } from 'src/app/core/store/actions/chat-faq.action';
import { selectChatFaqSaving } from 'src/app/core/store/selectors/chat-faq.selector';

@Component({
  selector: 'app-chat-faq-add',
  templateUrl: './chat-faq-add.component.html',
  styleUrls: ['./chat-faq-add.component.scss'],
})
export class ChatFaqAddComponent implements OnInit {
  public unsubscribeAll: Subject<boolean>;
  saving$: Observable<boolean>;
  errorMessage$: Observable<any>;
  invalid: boolean;
  ChatFaqForm: FormGroup;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ChatFaqAddComponent>
  ) {
    this.unsubscribeAll = new Subject();
    this.ChatFaqForm = new FormGroup({
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),
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
      chatFaqSaveRequested({
        input: this.ChatFaqForm.value,
      })
    );

    this.saving$.subscribe((saving) => {
      if (!saving) {
          this.dialogRef.close();
      }
    });
  }
}
