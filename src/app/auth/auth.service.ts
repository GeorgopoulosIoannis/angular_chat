import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(
		private http: HttpClient,
		private router: Router,
		private jwtHelper: JwtHelperService,
		private storage: StorageService
	) {}
	login(credentials): Observable<string> {
		return this.http.post<string>(environment.api + 'api/user/login', credentials);
	}
	authenticate(jwt) {
		if (!this.jwtHelper.isTokenExpired(jwt)) {
			this.storage.set('token', jwt);
		}
	}
	register(credentials): Observable<string> {
		return this.http.post<string>(environment.api + 'api/user/register', credentials);
	}
	logout() {
		localStorage.clear();
		this.router.navigate(['/login']);
	}

	isAuthenticated(): boolean {
		const token = this.storage.get('token');
		if (this.jwtHelper.isTokenExpired(token) || token == null) {
			return false;
		}
		return true;
	}
}
