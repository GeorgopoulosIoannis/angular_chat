import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

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
		private shared: SharedService
	) {
		this.form = fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	login(credentials) {
		this.auth.login(credentials).subscribe(
			jwt => {

				debugger
				this.auth.authenticate(jwt);
				this.shared.setMe(credentials.email);
				this.router.navigate(['']);
			},
			error => {
				this.showAlert = true;
			}
		);
	}

	ngOnInit() {}
}
