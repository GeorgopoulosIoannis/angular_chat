import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ImageService {
	constructor(private http: HttpClient) {}

	getProfileImages(email): Observable<[any]> {
		const params = new HttpParams().set('email', email);
		return this.http.get<[any]>(environment.api + 'api/image', { params });
	}

	addImage(image): Observable<any> {
		const body = image;
		return this.http.post<any>(environment.api + 'api/image/add', body);
	}
}
