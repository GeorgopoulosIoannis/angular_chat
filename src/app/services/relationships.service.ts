import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FriendInvite } from '../Models/friend-invite';
@Injectable({
	providedIn: 'root'
})
export class RelationshipsService {
	constructor(private http: HttpClient) {}

	getRelationships(status: string) {
		const params = new HttpParams().set('status', status);
		return this.http.get<any>(environment.api + 'api/friends', { params });
	}

	inviteFriend(emailOut): Observable<any> {
		const body: FriendInvite = { email: emailOut, status: 0 };
		return this.http.post<any>(environment.api + 'api/friends/add', body);
	}
}
