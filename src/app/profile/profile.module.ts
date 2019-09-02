import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { UploadComponent } from '../upload/upload.component';
import { VisitorOptionsComponent } from './visitor-options/visitor-options.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageGridComponent } from './image-grid/image-grid.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
	declarations: [
		ProfileLayoutComponent,
		UploadComponent,
		VisitorOptionsComponent,
		ImageGridComponent,
		ImageViewComponent
	],
	imports: [CommonModule, ReactiveFormsModule, FormsModule, ProfileRoutingModule],
	exports: [ProfileLayoutComponent, VisitorOptionsComponent, ImageGridComponent, ImageViewComponent]
})
export class ProfileModule {}
