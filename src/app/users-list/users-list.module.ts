import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersListComponent } from './all-users-list/all-users-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [AllUsersListComponent],
	imports: [CommonModule, RouterModule],
	exports: [AllUsersListComponent]
})
export class UsersListModule {}
