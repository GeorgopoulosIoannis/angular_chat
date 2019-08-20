import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Tab } from 'src/app/Models/tab';
import { Router } from '@angular/router';
import { ChatMessage } from 'src/app/Models/chat-message';

@Component({
	selector: 'chat-conversations-list',
	templateUrl: './conversations-list.component.html',
	styleUrls: ['./conversations-list.component.scss']
})
export class ConversationsListComponent implements OnInit {
	unreadMessages: any;
	constructor(private shared: SharedService, private router: Router) {}

	ngOnInit() {
		this.unreadMessages = [];

		this.shared.getUnreadMessages().subscribe(messages => {
			this.unreadMessages = messages;
		});

		// this.shared.curTabList.subscribe(data => {
		// 	this.tabList = data;
		// });
	}

	switchTab(email) {
		this.shared.changeTab(this.shared.findOrCreateTab(email));
		this.router.navigate(['/chatbox']);
	}
}
