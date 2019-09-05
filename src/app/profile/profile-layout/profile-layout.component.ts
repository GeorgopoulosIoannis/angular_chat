import { Component, OnInit, TemplateRef } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/Models/profile';
import { environment } from 'src/environments/environment';
import { TouchSequence } from 'selenium-webdriver';
import { RelationshipsService } from 'src/app/services/relationships.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { Myimg } from 'src/app/Models/myimg';

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
	modalRef: BsModalRef;
	isFriend: boolean;
	images = [];
	form;

	constructor(
		private activatedRouter: ActivatedRoute,
		private profileService: ProfileService,
		private storage: StorageService,
		private relService: RelationshipsService,
		private modal: BsModalService,
		private fb: FormBuilder,
		private auth: AuthService,
		private imageService: ImageService
	) {
		this.form = fb.group({
			alias: ['', Validators.required],
			description: ['', Validators.required]
		});
	}

	ngOnInit() {
		this.activatedRouter.paramMap.subscribe(params => {
			this.userEmail = params.get('email');
			this.profileService.getProfile(this.userEmail).subscribe(res => {
				this.profile = res;
				this.avatar = environment.api + res.avatar;
				this.profileService.setMemoryProfile(res);
				this.checkIfFriends();
			});
			this.getImages();
		});
		this.me = this.storage.get('me');
	}

	IsMe() {
		return this.me === this.userEmail && this.auth.isAuthenticated();
	}

	updateImage(path) {
		this.profile.avatar = path.dbPath;
		this.profileService.updateProfile(this.profile).subscribe(res => {
			this.profile.avatar = path.dbPath;
			location.reload();
		});
	}

	getImages() {
		this.imageService.getProfileImages(this.userEmail).subscribe(res => {
			this.images = res;
			console.log(res);
		});
	}
	addImage(path) {
		const img = new Myimg(this.userEmail, path.dbPath);
		this.imageService.addImage(img).subscribe(res => {
			console.log(res);
			this.getImages();
		});
	}
	Invite() {
		this.relService.inviteFriend(this.userEmail).subscribe(res => {
			console.log(res);
		});
	}
	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modal.show(template);
	}

	submitChanges(values) {
		this.profile.alias = values.alias;
		this.profile.description = values.description;

		this.profileService.updateProfile(this.profile).subscribe(res => {
			console.log(values);
			this.form.reset();
			this.modalRef.hide();
		});
	}

	checkIfFriends() {
		let friends = this.relService.getMemoryFriends();
		for (let friend of friends) {
			if (friend.email == this.profile.email) {
				this.isFriend = true;
			}
		}
	}
}
