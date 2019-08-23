import { Injectable, EventEmitter } from '@angular/core';
import { HubService } from './hub.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tab } from '../Models/tab';
import { ChatMessage } from '../Models/chat-message';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class SharedService {
	/***************Declare variables ******************************/
	me: string;
	tabs: Tab[];
	list = [];
	connectionEstablished = false;
	private tabSource = new BehaviorSubject(new Tab(''));
	curTab = this.tabSource.asObservable();

	private tabListSource = new BehaviorSubject([]);
	curTabList = this.tabListSource.asObservable();

	private connectionListSource = new BehaviorSubject([]);
	connectionList = this.connectionListSource.asObservable();

	private onlineConnectionListSource = new BehaviorSubject([]);
	onlineConnectionList = this.onlineConnectionListSource.asObservable();

	unreadMessages = new EventEmitter<ChatMessage[]>();

	constructor(
		private hub: HubService,
		private http: HttpClient,
		private toastr: ToastrService,
		private router: Router
	) {
		this.init();
	}

	init() {
		this.tabs = [];
		/*************************** Subscribe on receiving messages *****************************/
		this.hub.messageReceived.subscribe((message: ChatMessage) => {
			/********************** Find if tab for message exists or create it  *********************/
			let tab = this.findOrCreateTab(message.from);
			/********************** Add message to tab ***********************************************/
			this.pushMessageToTab(tab, message);
			/************** If tab is active mark message as read and send back to server ************/
			if (tab.isActive) {
				message.unread = false;
				this.readMessage(message).subscribe(res => {
					console.log(res);
				});
				setTimeout(() => this.updateScroll(), 0);
			} else {
				/*********** If tab is not active show toaster notification and add to unread ***********/

				this.showInfo(message.from);
				this.emitUnread();
			}
		});
		/************** Subscribe to connections list on hub which gets updated every time a user registers ***/
		this.hub.connectionsList.subscribe(data => {
			this.connectionListSource.next(data);
		});
		/************** Subscribe to online connections list on hub which gets updated every time a user log in ***/
		this.hub.onlineConnectionsList.subscribe(data => {
			this.onlineConnectionListSource.next(data);
		});
	}

	/************* Change activated tab **************************/
	changeTab(tab: Tab) {
		tab.isActive = true;
		/*************Subscribe to request tab message history from server **************/
		this.getTabHistory(tab.username).subscribe(res => {
			tab.messageHistory = res;
			setTimeout(() => {
				this.updateScroll();
			}, 0);
		});
		this.tabSource.next(tab);
	}
	/************ Request for tab message history ***************/
	getTabHistory(to, currentPage = 1): Observable<[ChatMessage]> {
		const params = new HttpParams().set('to', to).set('currentPage', currentPage.toString());
		return this.http.get<[ChatMessage]>(environment.api + 'api/messages', { params });
	}
	/************ Request for unread messages  ***************/
	getUnreadMessages(): Observable<[ChatMessage]> {
		return this.http.get<[ChatMessage]>(environment.api + 'api/messages/unread');
	}

	/************************* Emit unread messages to synchronize with unread messages list ****************/
	emitUnread() {
		this.getUnreadMessages().subscribe(res => {
			this.unreadMessages.emit(res);
		});
	}

	/**************** Send confirmation to server that the message has been read */
	readMessage(message) {
		return this.http.post<any>(environment.api + 'api/messages/confirm', message);
	}

	/************ Add tab to list *******************************/
	addTabToList(tab: Tab) {
		this.tabs.push(tab);
		this.tabListSource.next(this.tabs);
	}

	/********************* Scroll to bottom of chat messages **********************/
	updateScroll() {
		const body = document.getElementById('historyBody');
		body.scrollTop = body.scrollHeight;
	}

	/************************* Function that either creates a tab or return the tab if already exists */
	findOrCreateTab(email) {
		for (let tab of this.tabs) {
			if (tab.username === email) {
				return tab;
			}
		}
		let newTab = new Tab(email);
		this.addTabToList(newTab);
		return newTab;
	}

	/****************** Add message to tab history **********************************/
	pushMessageToTab(tab: Tab, message: ChatMessage) {
		tab.messageHistory.push(message);
	}
	/********************* Toaster notification when message arrives ***********************/
	showInfo(email) {
		var msg = email;
		this.toastr.info(email, 'New message from').onTap.subscribe(() => {
			this.toasterClickedHandler(msg);
		});
	}
	/***************************Toaster Notification for successfull user interactions ******************/
	showSuccess(message) {
		this.toastr.success(message);
	}
	/**************************Toaster Notification for errors ******************/
	showFailure(message){
		this.toastr.error(message);
	}

	/******************** redirect to chat when toaster is clicked *********************/
	toasterClickedHandler(email) {
		this.changeTab(this.findOrCreateTab(email));
		this.router.navigate(['/chatbox']);
	}
}
