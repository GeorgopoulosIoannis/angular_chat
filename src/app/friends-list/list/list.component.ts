import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { Tab } from 'src/app/Models/tab';
import { HubService } from 'src/app/services/hub.service';

@Component({
	selector: 'chat-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	list = [];
	onlineList = [];
	tabList: Tab[];
	constructor(private shared: SharedService, private router: Router, private hub: HubService) {}

	ngOnInit() {
		debugger
		this.hub.startNegotiation();

		this.shared.connectionList.subscribe(data => {
			this.list = data;
		});
		this.shared.onlineConnectionList.subscribe(data => {
			this.onlineList = data;
		});
		this.shared.curTabList.subscribe(data => {
			this.tabList = data;
		});
	}

	switchTab(email) {
		this.shared.changeTab(this.shared.findOrCreateTab(email));
		this.router.navigate(['/chatbox']);
	}

	addOnlineMark(email) {
		if (this.onlineList.includes(email)) {
			return true;
		} else {
			return false;
		}
	}
}
