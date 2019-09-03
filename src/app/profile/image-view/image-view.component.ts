import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ImageService } from 'src/app/services/image.service';
import { ImageWithLikes } from 'src/app/Models/image-with-likes';
import { environment } from 'src/environments/environment';
import { TouchSequence } from 'selenium-webdriver';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ImageComment } from 'src/app/Models/image-comment';

@Component({
	selector: 'chat-image-view',
	templateUrl: './image-view.component.html',
	styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {
	email: string;
	curComment: string;
	imageId: string;
	imageComments = [];
	image: ImageWithLikes;
	base = environment.api;
	count: number = 0;

	constructor(
		private activatedRouter: ActivatedRoute,
		private profile: ProfileService,
		private imageService: ImageService,
		private profileService: ProfileService
	) {}

	ngOnInit() {
		this.activatedRouter.parent.paramMap.subscribe(params => {
			this.email = params.get('email');
		});
		this.activatedRouter.paramMap.subscribe(params => {
			this.imageId = params.get('id');
			this.imageService.getImageById(this.imageId).subscribe(res => {
				this.image = res;
			});
		});
		this.imageService.getImageComments(this.imageId).subscribe(res => {
			if (res != undefined) {
				this.imageComments = res;
			}
		});
	}

	tapEvent() {
		this.count++;
		setTimeout(() => {
			if (this.count == 1) {
				this.count = 0;
			}
			if (this.count > 1) {
				this.count = 0;
				this.like();
			}
		}, 250);
	}

	like() {
		this.imageService.likeImage(this.image.id).subscribe(res => {
			this.image.likesCount += 1;
		});
	}

	postComment() {
		const comment = new ImageComment(this.curComment, this.imageId);
		var me = this;
		this.imageService.commentImage(comment).subscribe(res => {
			this.imageService.getImageComments(me.image.id).subscribe(res => {
				console.log('inside callback');
				console.log(res);
				me.curComment = '';
				me.imageComments = res;
			});
		});
	}
}
