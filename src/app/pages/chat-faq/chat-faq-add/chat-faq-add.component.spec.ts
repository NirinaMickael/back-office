import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFaqAddComponent } from './chat-faq-add.component';

describe('ChatFaqAddComponent', () => {
  let component: ChatFaqAddComponent;
  let fixture: ComponentFixture<ChatFaqAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatFaqAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFaqAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
