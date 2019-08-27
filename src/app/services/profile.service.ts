import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Profile } from '../Models/profile';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	constructor(private http: HttpClient) {}

	getProfile(email: string): Observable<Profile> {
		const params = new HttpParams().set('email', email);
		return this.http.get<Profile>(environment.api + 'api/profile', { params });
	}

	getSuggestions(): Observable<any> {
		return this.http.get<any>(environment.api + 'api/profile/suggestions');
	}

	updateProfile(profile): Observable<any> {
		const body = profile;
		return this.http.post<any>(environment.api + 'api/profile/update', body);
	}
}
