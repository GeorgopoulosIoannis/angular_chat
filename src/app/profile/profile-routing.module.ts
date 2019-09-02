import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { ImageViewComponent } from './image-view/image-view.component';

const routes: Routes = [
	{
		path: 'profile/:email',
		children: [  {
			path: '',
			component: ProfileLayoutComponent,
		  },
			{
				path: 'image/:id',
				component: ImageViewComponent
			}
		]
	}
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class ProfileRoutingModule {}
