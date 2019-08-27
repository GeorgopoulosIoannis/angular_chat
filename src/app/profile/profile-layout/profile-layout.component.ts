import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/Models/profile';
import { environment } from 'src/environments/environment';
import { TouchSequence } from 'selenium-webdriver';

@Component({
	selector: 'chat-profile-layout',
	templateUrl: './profile-layout.component.html',
	styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {
	userEmail: string;
	profile: Profile;
	avatar: string;
	me: string;
	constructor(
		private activatedRouter: ActivatedRoute,
		private profileService: ProfileService,
		private storage: StorageService
	) {}

	ngOnInit() {
		this.activatedRouter.paramMap.subscribe(params => {
			this.userEmail = params.get('email');
			this.profileService.getProfile(this.userEmail).subscribe(res => {
				this.profile = res;
				this.avatar = environment.api + res.avatar;
			});
		});
		this.me = this.storage.get('me');
	}

	IsMe() {
		return (this.me = this.userEmail);
	}

	updateImage(path) {
		this.profile.avatar = path.dbPath;
		this.profileService.updateProfile(this.profile).subscribe(res => {
			this.profile.avatar = path.dbPath;
			location.reload();
		});
	}
}
