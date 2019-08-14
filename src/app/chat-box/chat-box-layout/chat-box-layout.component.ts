import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Tab } from 'src/app/Models/tab';

@Component({
	selector: 'chat-chat-box-layout',
	templateUrl: './chat-box-layout.component.html',
	styleUrls: ['./chat-box-layout.component.scss']
})
export class ChatBoxLayoutComponent implements OnInit, OnDestroy {
	curTab: Tab;

	constructor(private shared: SharedService, private router: Router) {}

	ngOnInit() {
		this.shared.curTab.subscribe(data => {
			this.curTab = data;
			this.curTab.unread = 0;
		});
	}

	ngOnDestroy(): void {
		this.curTab.isActive = false;
	}

}
