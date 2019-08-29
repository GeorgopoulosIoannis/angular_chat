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
	form;

	constructor(
		private activatedRouter: ActivatedRoute,
		private profileService: ProfileService,
		private storage: StorageService,
		private relService: RelationshipsService,
		private modal: BsModalService,
		private fb: FormBuilder,
		private auth: AuthService
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
			});
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

	Invite() {
		this.relService.inviteFriend(this.userEmail).subscribe(res => {
			console.log(res);
		});
	}
	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modal.show(template);
	}

	SubmitChanges(values) {
		this.profile.alias = values.alias;
		this.profile.description = values.description;

		this.profileService.updateProfile(this.profile).subscribe(res => {
			console.log(values);
			this.form.reset();
			this.modalRef.hide();
		});
	}
}
