import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersListComponent } from './all-users-list/all-users-list.component';

@NgModule({
	declarations: [AllUsersListComponent],
	imports: [CommonModule],
	exports: [AllUsersListComponent]
})
export class UsersListModule {}
