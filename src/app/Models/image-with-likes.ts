export class ImageWithLikes {
	id: number;
	email: string;
	path: string;
	likesCount: number;

	constructor(email, path, likesCount, id) {
		this.id = id;
		this.email = email;
		this.path = path;
		this.likesCount = likesCount;
	}
}
