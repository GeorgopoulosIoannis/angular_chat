import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ChatBoxModule } from '../chat-box/chat-box.module';
import { FriendsListModule } from '../friends-list/friends-list.module';

@NgModule({
	declarations: [MainLayoutComponent],
	imports: [CommonModule, ChatBoxModule, FriendsListModule]
})
export class MainScreenModule {}
