export class ImageComment {
	content: string;
	imageId: number;

	constructor(content, imageId) {
		this.content = content;

		this.imageId = imageId;
	}
}
