import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxLayoutComponent } from './chat-box-layout.component';

describe('ChatBoxLayoutComponent', () => {
	let component: ChatBoxLayoutComponent;
	let fixture: ComponentFixture<ChatBoxLayoutComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ChatBoxLayoutComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChatBoxLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
