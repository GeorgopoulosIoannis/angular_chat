import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { UploadComponent } from '../upload/upload.component';

@NgModule({
	declarations: [ProfileLayoutComponent, UploadComponent],
	imports: [CommonModule],
	exports: [ProfileLayoutComponent]
})
export class ProfileModule {}
