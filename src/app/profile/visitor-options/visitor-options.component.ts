import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'src/app/Models/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { RelationshipsService } from 'src/app/services/relationships.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
	selector: 'chat-visitor-options',
	templateUrl: './visitor-options.component.html',
	styleUrls: ['./visitor-options.component.scss']
})
export class VisitorOptionsComponent implements OnInit {
	@Input() profile: Profile;

	constructor(private relService: RelationshipsService, private shared: SharedService) {}

	ngOnInit() {}

	invite() {
		this.relService.inviteFriend(this.profile.email).subscribe(
			res => {
				this.shared.showSuccess('User ' + this.profile.alias + ' has been successfully invited');
			},
			error => {
				this.shared.showFailure('There is already a pending friend invite for this user');
			}
		);
	}

	block() {
		this.relService.block(this.profile.email).subscribe(
			res => {
				this.shared.showFailure('User ' + this.profile.alias + ' has been blocked!');
			},
			err => {}
		);
	}
}
