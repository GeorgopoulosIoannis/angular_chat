import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../services/storage.service';
import { environment } from 'src/environments/environment';
import { HubService } from '../services/hub.service';
import { SharedService } from '../services/shared.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(
		private http: HttpClient,
		private router: Router,
		private jwtHelper: JwtHelperService,
		private storage: StorageService,
		private hub: HubService,
		private shared: SharedService
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
		this.hub.stopConnection();
		location.reload();
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
