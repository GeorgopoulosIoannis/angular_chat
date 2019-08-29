import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { UploadComponent } from '../upload/upload.component';
import { VisitorOptionsComponent } from './visitor-options/visitor-options.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
	declarations: [ProfileLayoutComponent, UploadComponent, VisitorOptionsComponent],
	imports: [CommonModule, ReactiveFormsModule, FormsModule],
	exports: [ProfileLayoutComponent, VisitorOptionsComponent]
})
export class ProfileModule {}
