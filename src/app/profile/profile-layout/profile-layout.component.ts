import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'chat-profile-layout',
	templateUrl: './profile-layout.component.html',
	styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {
	me: string;
	constructor(private storage: StorageService) {}

	ngOnInit() {
		this.me = this.storage.get('me');
	}
}
