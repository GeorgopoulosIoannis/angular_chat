import { Component, OnInit, NgZone, Input } from '@angular/core';
import { Tab } from 'src/app/Models/tab';
import { ChatMessage } from 'src/app/Models/chat-message';
import { HubService } from 'src/app/services/hub.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
	selector: 'chat-chat-box-message-history',
	templateUrl: './chat-box-message-history.component.html',
	styleUrls: ['./chat-box-message-history.component.scss']
})
export class ChatBoxMessageHistoryComponent implements OnInit {
	email;
	@Input() curTab: Tab;
	tabList: Tab[];
	constructor(private hub: HubService, private shared: SharedService) {}

	ngOnInit() {
		this.shared.curTabList.subscribe(data => {
			this.tabList = data;
		});

	}
}
