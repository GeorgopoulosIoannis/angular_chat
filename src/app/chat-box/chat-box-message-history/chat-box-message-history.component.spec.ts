import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxMessageHistoryComponent } from './chat-box-message-history.component';

describe('ChatBoxMessageHistoryComponent', () => {
	let component: ChatBoxMessageHistoryComponent;
	let fixture: ComponentFixture<ChatBoxMessageHistoryComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ChatBoxMessageHistoryComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChatBoxMessageHistoryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
