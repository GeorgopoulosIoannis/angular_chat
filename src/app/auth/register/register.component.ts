import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ERROR_COMPONENT_TYPE } from '@angular/compiler';

@Component({
	selector: 'chat-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	form;
	errors = [];
	description: string;
	showSuccess = false;
	showError = false;

	constructor(private auth: AuthService, private fb: FormBuilder) {
		this.form = fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	register(credentials) {
		this.errors = [];
		this.auth.register(credentials).subscribe(
			res => {
				this.showSuccess = true;
				this.showError = false;
			},
			error => {
				error.error.forEach(error => {
					this.errors.push(error.description);
				});
				// this.code = error.error[0].code;
				// this.description = error.error[0].description;
				this.showError = true;
			}
		);
	}

	ngOnInit() {}
}
