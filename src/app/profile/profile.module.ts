import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { UploadComponent } from '../upload/upload.component';
import { VisitorOptionsComponent } from './visitor-options/visitor-options.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageGridComponent } from './image-grid/image-grid.component';

@NgModule({
	declarations: [ProfileLayoutComponent, UploadComponent, VisitorOptionsComponent, ImageGridComponent],
	imports: [CommonModule, ReactiveFormsModule, FormsModule],
	exports: [ProfileLayoutComponent, VisitorOptionsComponent, ImageGridComponent]
})
export class ProfileModule {}
