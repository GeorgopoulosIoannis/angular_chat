import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/Models/profile';
import { AuthService } from 'src/app/auth/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
	selector: 'chat-image-grid',
	templateUrl: './image-grid.component.html',
	styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent implements OnInit {
	@Input() images: [];
	profile: Profile;
	base = environment.api;
	me;
	userEmail;
	selectedIndex;
	constructor(
		private profileService: ProfileService,
		private auth: AuthService,
		private storage: StorageService,
		private shared: SharedService,
		private activatedRouter: ActivatedRoute
	) {}

	ngOnInit() {
		this.me = this.storage.get('me');
		this.activatedRouter.paramMap.subscribe(params => {
			this.userEmail = params.get('email');
		});
	}

	selectImage(index: number) {
		this.selectedIndex = index;
	}

	setAvatar(image) {
		this.profile = this.profileService.getMemoryProfile();
		if (image.path !== this.profile.avatar) {
			this.profileService.updateProfile(this.profile).subscribe(res => {
				location.reload();
			});
			this.profileService.setMemoryProfile(this.profile);
		} else {
			this.shared.showFailure('This image is already your profile picture');
		}
	}

	IsMe() {
		return this.me === this.userEmail && this.auth.isAuthenticated();
	}
}
