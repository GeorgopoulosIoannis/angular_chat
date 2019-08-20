import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
	selector: 'chat-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
	unreadMessages = [];
	isCollapsed = true;
	constructor(private auth: AuthService, private shared: SharedService) {}

	ngOnInit() {
		this.shared.getUnreadMessages().subscribe(messages => {
			this.unreadMessages = messages;
			console.log('unread:' + this.unreadMessages);
		});
	}

	Authenticated() {
		return this.auth.isAuthenticated();
	}
	logout() {
		this.auth.logout();
	}
}
