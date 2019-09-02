import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatBoxModule } from './chat-box/chat-box.module';
import { SharedModule } from './shared/shared.module';
import { FriendsListModule } from './friends-list/friends-list.module';
import { MainScreenModule } from './main-screen/main-screen.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ProfileModule } from './profile/profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { UsersListModule } from './users-list/users-list.module';
import { FriendRequestsModule } from './friend-requests/friend-requests.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ChatBoxModule,
		SharedModule,
		FriendsListModule,
		MainScreenModule,
		ConversationsModule,
		ProfileModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot(),
		UsersListModule,
		FriendRequestsModule,
		ModalModule.forRoot()
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
