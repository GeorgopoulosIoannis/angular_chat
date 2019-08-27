import { Component, OnInit } from '@angular/core';
import { RelationshipsService } from 'src/app/services/relationships.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'chat-friend-requests-list',
	templateUrl: './friend-requests-list.component.html',
	styleUrls: ['./friend-requests-list.component.scss']
})
export class FriendRequestsListComponent implements OnInit {
	requests = [];
	base = environment.api;
	constructor(private rels: RelationshipsService, private shared: SharedService) {}

	ngOnInit() {
		this.rels.getRelationships('0').subscribe(res => {
			console.log('friend requests');
			console.log(res);
			this.requests = res;
		});
	}

	remove(profile) {
		let index = this.requests.indexOf(profile);
		this.requests.splice(index, 1);
	}

	accept(profile) {
		this.rels.acceptFriend(profile.email).subscribe(res => {
			let index = this.requests.indexOf(profile);
			this.requests.splice(index, 1);
			this.shared.showSuccess('Accepted Request');
		});
	}
}
