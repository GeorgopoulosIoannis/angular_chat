import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'chat-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
	isCollapsed = true;
	constructor(
		private auth: AuthService,
		private router: Router,
		private storage: StorageService
	) {}
	ngOnInit() {}

	Authenticated() {
		return this.auth.isAuthenticated();
	}
	logout() {
		this.auth.logout();
	}

	goToProfile() {
		this.router.navigate(['/profile', this.storage.get('me')]);
	}
}
