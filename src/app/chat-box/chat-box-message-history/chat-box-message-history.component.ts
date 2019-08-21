import { Component, OnInit, NgZone, Input, AfterViewInit } from '@angular/core';
import { Tab } from 'src/app/Models/tab';
import { ChatMessage } from 'src/app/Models/chat-message';
import { HubService } from 'src/app/services/hub.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'chat-chat-box-message-history',
	templateUrl: './chat-box-message-history.component.html',
	styleUrls: ['./chat-box-message-history.component.scss']
})
export class ChatBoxMessageHistoryComponent implements OnInit, AfterViewInit {
	email;
	@Input() curTab: Tab;
	constructor(private hub: HubService, private shared: SharedService, private storage: StorageService) {}

	ngOnInit() {
		this.email = this.storage.get('me');
	}
	ngAfterViewInit(): void {
		setTimeout(() => {
			this.shared.updateScroll();
		}, 200);

	}
}
