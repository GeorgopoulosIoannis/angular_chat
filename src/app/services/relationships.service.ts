import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class RelationshipsService {
	constructor(private http: HttpClient) {}

	getRelationships(status: string) {
		const params = new HttpParams().set('status', status);
		return this.http.get<any>(environment.api + 'api/relationships', { params });
	}
}
