import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, ObservedValueOf } from 'rxjs';
import { FriendInvite } from '../Models/friend-invite';
import { UpdateStatus } from '../Models/update-status';
@Injectable({
	providedIn: 'root'
})
export class RelationshipsService {
	constructor(private http: HttpClient) {}

	getRelationships(status: string): Observable<any> {
		const params = new HttpParams().set('status', status);
		return this.http.get<any>(environment.api + 'api/friends', { params });
	}

	inviteFriend(emailOut): Observable<any> {
		const body: FriendInvite = { email: emailOut, status: 0 };
		return this.http.post<any>(environment.api + 'api/friends/add', body);
	}

	acceptFriend(emailOut): Observable<any> {
		const body: UpdateStatus = { email: emailOut, status: 1 };
		return this.http.post<any>(environment.api + 'api/friends/update', body);
	}

	block(emailOut): Observable<any> {
		const body: FriendInvite = { email: emailOut, status: 3 };
		return this.http.post<any>(environment.api + 'api/friends/add', body);
	}
}
