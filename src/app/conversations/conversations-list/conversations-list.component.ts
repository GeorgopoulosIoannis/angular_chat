import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Tab } from 'src/app/Models/tab';
import { Router } from '@angular/router';
import { ChatMessage } from 'src/app/Models/chat-message';
import { TouchSequence } from 'selenium-webdriver';

@Component({
	selector: 'chat-conversations-list',
	templateUrl: './conversations-list.component.html',
	styleUrls: ['./conversations-list.component.scss']
})
export class ConversationsListComponent implements OnInit {
	unreadMessages = [];
	constructor(private shared: SharedService, private router: Router) {}

	ngOnInit() {
		this.shared.emitUnread();
		this.shared.unreadMessages.subscribe(messages => {
			this.unreadMessages = messages;
			console.log('unread from conv list onInit:' + this.unreadMessages);
		});
	}

	switchTab(email) {
		this.shared.changeTab(this.shared.findOrCreateTab(email));
		this.router.navigate(['/chatbox']);
	}
}
