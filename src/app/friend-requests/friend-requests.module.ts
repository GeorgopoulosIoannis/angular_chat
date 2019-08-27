import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendRequestsListComponent } from './friend-requests-list/friend-requests-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [FriendRequestsListComponent],
	imports: [CommonModule, RouterModule],
	exports: [FriendRequestsListComponent]
})
export class FriendRequestsModule {}
