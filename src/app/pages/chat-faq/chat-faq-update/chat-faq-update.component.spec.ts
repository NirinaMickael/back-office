import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFaqUpdateComponent } from './chat-faq-update.component';

describe('ChatFaqUpdateComponent', () => {
  let component: ChatFaqUpdateComponent;
  let fixture: ComponentFixture<ChatFaqUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatFaqUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFaqUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
