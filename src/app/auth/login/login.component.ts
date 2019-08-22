import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'chat-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	form;
	showAlert = false;
	constructor(
		private auth: AuthService,
		private fb: FormBuilder,
		private router: Router,
		private shared: SharedService,
		private storage: StorageService
	) {
		this.form = fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	login(credentials) {
		this.storage.set('me', credentials.email);
		this.auth.login(credentials).subscribe(
			jwt => {
				this.auth.authenticate(jwt);
				this.router.navigate(['']);
			},
			error => {
				this.showAlert = true;
			}
		);
	}

	ngOnInit() {}
}
