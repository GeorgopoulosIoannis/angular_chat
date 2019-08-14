import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatBoxModule } from './chat-box/chat-box.module';
import { SharedModule } from './shared/shared.module';
import { FriendsListModule } from './friends-list/friends-list.module';
import { MainScreenModule } from './main-screen/main-screen.module';
import { ConversationsModule } from './conversations/conversations.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ChatBoxModule,
		SharedModule,
		FriendsListModule,
		MainScreenModule,
		ConversationsModule
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
