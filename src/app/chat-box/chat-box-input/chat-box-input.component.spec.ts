import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxInputComponent } from './chat-box-input.component';

describe('ChatBoxInputComponent', () => {
  let component: ChatBoxInputComponent;
  let fixture: ComponentFixture<ChatBoxInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBoxInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBoxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
