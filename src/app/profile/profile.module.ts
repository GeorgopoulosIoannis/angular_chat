import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';

@NgModule({
	declarations: [ProfileLayoutComponent],
	imports: [CommonModule],
	exports: [ProfileLayoutComponent]
})
export class ProfileModule {}
