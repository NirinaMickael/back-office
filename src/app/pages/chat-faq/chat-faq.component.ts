import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatFaqEntry } from 'src/app/core/schemas/chat-faq.schema';
import {
  chatFaqDeleteRequested,
  chatFaqLoadRequested,
} from 'src/app/core/store/actions/chat-faq.action';
import {
  selectAllChatFaqs,
  selectChatFaqLoading,
  selectChatFaqSaving,
} from 'src/app/core/store/selectors/chat-faq.selector';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { ChatFaqAddComponent } from './chat-faq-add/chat-faq-add.component';
import { ChatFaqUpdateComponent } from './chat-faq-update/chat-faq-update.component';

@Component({
  selector: 'app-chat-faq',
  templateUrl: './chat-faq.component.html',
  styleUrls: ['./chat-faq.component.scss'],
})
export class ChatFaqComponent implements OnInit, OnDestroy {
  public unsubscribeAll: Subject<boolean>;
  chatFaqs$: Observable<ChatFaqEntry[]>;
  chatFaqs: ChatFaqEntry[] = [];
  loading$: Observable<boolean>;
  search: any;
  constructor(private dialog: MatDialog, private store: Store) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.store.dispatch(chatFaqLoadRequested());
    this.chatFaqs$ = this.store
      .select(selectAllChatFaqs)
      .pipe(takeUntil(this.unsubscribeAll));

    this.chatFaqs$.subscribe(data => {
      this.chatFaqs = data;
    })

    this.loading$ = this.store
      .select(selectChatFaqLoading)
      .pipe(takeUntil(this.unsubscribeAll));
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  openAddDialog() {
    this.dialog.open(ChatFaqAddComponent, {
      width: '500px',
    });
  }

  openEditDialog(chatFaq: ChatFaqEntry) {
    this.dialog.open(ChatFaqUpdateComponent, {
      width: '500px',
      data: chatFaq,
    });
  }

  editChatFaq(event) {
    this.openEditDialog(event);
  }

  deleteChatFaq(event: ChatFaqEntry) {
    const dialofRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        action: 'Delete',
        message: 'Are you sure you want to delete this faq?',
        icon: 'warning',
        color: 'red',
      },
    });

    dialofRef.afterClosed().subscribe((data) => {
      console.log('delete data', data);

      if (data && data.result === 'confirmed') {
        console.log('data comfiremed', event);
        this.store.dispatch(chatFaqDeleteRequested({ entry: event }));
      }
    });
  }
}
