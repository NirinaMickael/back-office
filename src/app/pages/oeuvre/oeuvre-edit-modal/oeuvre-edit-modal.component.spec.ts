import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeuvreEditModalComponent } from './oeuvre-edit-modal.component';

describe('OeuvreEditModalComponent', () => {
  let component: OeuvreEditModalComponent;
  let fixture: ComponentFixture<OeuvreEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OeuvreEditModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OeuvreEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
