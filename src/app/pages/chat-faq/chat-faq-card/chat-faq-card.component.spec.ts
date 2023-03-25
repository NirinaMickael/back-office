import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFaqCardComponent } from './chat-faq-card.component';

describe('ChatFaqCardComponent', () => {
  let component: ChatFaqCardComponent;
  let fixture: ComponentFixture<ChatFaqCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatFaqCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFaqCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
