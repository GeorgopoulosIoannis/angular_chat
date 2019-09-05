import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { ChatBoxModule } from './chat-box/chat-box.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChatBoxLayoutComponent } from './chat-box/chat-box-layout/chat-box-layout.component';
import { MainLayoutComponent } from './main-screen/main-layout/main-layout.component';
import { ListComponent } from './friends-list/list/list.component';
import { AuthGuard } from './guards/auth.guard';
import { CurrentTabGuard } from './guards/current-tab.guard';
import { ConversationsListComponent } from './conversations/conversations-list/conversations-list.component';
import { ProfileLayoutComponent } from './profile/profile-layout/profile-layout.component';
import { AllUsersListComponent } from './users-list/all-users-list/all-users-list.component';
import { FriendRequestsListComponent } from './friend-requests/friend-requests-list/friend-requests-list.component';
import { ImageViewComponent } from './profile/image-view/image-view.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'main', component: MainLayoutComponent, canActivate: [AuthGuard] },
	{ path: 'chatbox', component: ChatBoxLayoutComponent, canActivate: [CurrentTabGuard, AuthGuard] },
	{ path: 'friends', component: ListComponent, canActivate: [AuthGuard] },
	{ path: 'requests', component: FriendRequestsListComponent, canActivate: [AuthGuard] },
	{ path: 'users', component: AllUsersListComponent, canActivate: [AuthGuard] },
	{ path: 'convos', component: ConversationsListComponent, canActivate: [AuthGuard] },
	{ path: 'profile/:email', component: ProfileLayoutComponent, canActivate: [AuthGuard] },
	{ path: '', component: ListComponent, canActivate: [AuthGuard] },
	{ path: '*', component: ListComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes), AuthModule],
	exports: [RouterModule]
})
export class AppRoutingModule {}
