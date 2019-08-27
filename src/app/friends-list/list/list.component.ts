import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { Tab } from 'src/app/Models/tab';
import { HubService } from 'src/app/services/hub.service';
import { RelationshipsService } from 'src/app/services/relationships.service';

@Component({
	selector: 'chat-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	friends = [];
	onlineList = [];
	tabList: Tab[];
	constructor(
		private rel: RelationshipsService,
		private shared: SharedService,
		private router: Router,
		private hub: HubService
	) {}

	ngOnInit() {
		this.hub.startNegotiation();
		this.rel.getRelationships('1').subscribe(res => {
			this.friends = res;
			console.log('friends :');
			console.log(res);
		});
		this.shared.onlineConnectionList.subscribe(res => {
			this.onlineList = res;
			console.log('online :');
			console.log(res);
		});
		this.hub.friendsList.subscribe(res => {
			console.log('Frined list component : ');
			console.log(res);
			this.onlineList.push(res);
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
