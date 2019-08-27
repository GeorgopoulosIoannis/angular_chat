import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/Models/tab';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { HubService } from 'src/app/services/hub.service';
import { RelationshipsService } from 'src/app/services/relationships.service';
import { ProfileService } from 'src/app/services/profile.service';

import { environment } from 'src/environments/environment';

@Component({
	selector: 'chat-all-users-list',
	templateUrl: './all-users-list.component.html',
	styleUrls: ['./all-users-list.component.scss']
})
export class AllUsersListComponent implements OnInit {
	list = [];
	onlineList = [];
	tabList: Tab[];
	base = environment.api;
	constructor(
		private shared: SharedService,
		private router: Router,
		private hub: HubService,
		private relsService: RelationshipsService,
		private profService: ProfileService
	) {}

	ngOnInit() {
		this.hub.startNegotiation();

		// this.shared.connectionList.subscribe(data => {
		// 	this.list = data;
		// 	console.log('connectionlist :');
		// 	console.log(data);
		// });
		this.shared.onlineConnectionList.subscribe(data => {
			this.onlineList = data;
		});
		this.shared.curTabList.subscribe(data => {
			this.tabList = data;
		});
		this.profService.getSuggestions().subscribe(res => {
			this.list = res;
		});
	}


	switchTab(email) {
		this.shared.changeTab(this.shared.findOrCreateTab(email));
		this.router.navigate(['/chatbox']);
	}

	inviteFriend(email) {
		this.relsService.inviteFriend(email).subscribe(
			res => {
				this.shared.showSuccess('Invitation send successfully');
			},
			err => {
				this.shared.showFailure('Already invited');
			}
		);
	}
}
