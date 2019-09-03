import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImageWithLikes } from '../Models/image-with-likes';
import { ImageComment } from '../Models/image-comment';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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

	getImageById(imageId): Observable<ImageWithLikes> {
		const params = new HttpParams().set('id', imageId);
		return this.http.get<ImageWithLikes>(environment.api + 'api/image/id', { params });
	}

	likeImage(imageId): Observable<number> {
		const body = imageId;
		return this.http.post<any>(environment.api + 'api/Like/like', body);
	}

	commentImage(comment: ImageComment): Observable<any> {
		const body = comment;
		return this.http.post<any>(environment.api + 'api/Comment/comment', body);
	}

	getImageComments(imageId): Observable<[ImageComment]> {
		const params = new HttpParams().set('imageId', imageId);
		return this.http.get<any>(environment.api + 'api/ImageComment', { params });
	}
}
