import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'src/app/Models/chat-message';
import { HubService } from 'src/app/services/hub.service';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Tab } from 'src/app/Models/tab';

@Component({
	selector: 'chat-chat-box-input',
	templateUrl: './chat-box-input.component.html',
	styleUrls: ['./chat-box-input.component.scss']
})
export class ChatBoxInputComponent implements OnInit {
	@Input() curTab: Tab;
	curMessage: string;

	constructor(private hub: HubService, private shared: SharedService) {}

	sendPrivateMessage() {
		const chatMessage = new ChatMessage('', this.curMessage, this.curTab.username);
		this.curMessage = '';
		this.curTab.messageHistory.push(chatMessage);
		this.hub.sendPrivateMessage(chatMessage);
	}
	ngOnInit() {}
}
