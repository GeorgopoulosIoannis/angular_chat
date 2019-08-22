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
	me: string;
	tabs: Tab[];
	list = [];
	connectionEstablished = false;

	constructor(
		private hub: HubService,
		private http: HttpClient,
		private toastr: ToastrService,
		private router: Router
	) {
		this.init();
	}

	private tabSource = new BehaviorSubject(new Tab(''));
	curTab = this.tabSource.asObservable();

	private tabListSource = new BehaviorSubject([]);
	curTabList = this.tabListSource.asObservable();

	private connectionListSource = new BehaviorSubject([]);
	connectionList = this.connectionListSource.asObservable();

	private onlineConnectionListSource = new BehaviorSubject([]);
	onlineConnectionList = this.onlineConnectionListSource.asObservable();

	unreadMessages = new EventEmitter<ChatMessage[]>();

	changeTab(tab: Tab) {
		tab.isActive = true;
		this.getTabHistory(tab.username).subscribe(res => {
			tab.messageHistory = res;
			setTimeout(() => {
				this.updateScroll();
			}, 0);
		});
		this.tabSource.next(tab);
	}

	getTabHistory(to, currentPage = 1): Observable<[ChatMessage]> {
		const params = new HttpParams().set('to', to).set('currentPage', currentPage.toString());
		return this.http.get<[ChatMessage]>(environment.api + 'api/messages', { params });
	}

	getUnreadMessages(): Observable<[ChatMessage]> {
		return this.http.get<[ChatMessage]>(environment.api + 'api/messages/unread');
	}

	emitUnread() {
		this.getUnreadMessages().subscribe(res => {
			this.unreadMessages.emit(res);
		});
	}
	changeTabByEmail(email: string) {
		for (let tab of this.tabs) {
			if (tab.username === email) {
				this.changeTab(tab);
				break;
			}
		}
	}

	init() {
		this.tabs = [];
		this.hub.messageReceived.subscribe((message: ChatMessage) => {
			let tab = this.findOrCreateTab(message.from);
			this.pushMessageToTab(tab, message);
			if (tab.isActive) {
				message.unread = false;
				this.readMessage(message).subscribe(res => {
					console.log(res);
				});
				setTimeout(() => this.updateScroll(), 0);
			} else {
				this.showInfo(message.from);
				this.emitUnread();
			}
			console.log(tab);
		});

		this.hub.connectionsList.subscribe(data => {
			this.connectionListSource.next(data);
		});
		this.hub.onlineConnectionsList.subscribe(data => {
			this.onlineConnectionListSource.next(data);
		});
	}

	readMessage(message) {
		return this.http.post<any>(environment.api + 'api/messages/confirm', message);
	}

	addTabToList(tab: Tab) {
		this.tabs.push(tab);
		this.tabListSource.next(this.tabs);
	}

	checkListForTab(tab) {
		if (this.tabs.includes(tab)) {
			return true;
		} else {
			return false;
		}
	}
	updateScroll() {
		const body = document.getElementById('historyBody');
		body.scrollTop = body.scrollHeight;
	}

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

	setMe(email: string) {
		this.me = email;
	}

	getMe() {
		return this.me;
	}

	pushMessageToTab(tab: Tab, message: ChatMessage) {
		tab.messageHistory.push(message);
	}

	ConfirmMessages(curTab: Tab) {
		return this.http.post<any>(environment.api + 'api/messages/confirm', curTab);
	}

	showInfo(email) {
		var msg = email;
		this.toastr.info(email, 'New message from').onTap.subscribe(() => {
			this.toasterClickedHandler(msg);
		});
	}

	toasterClickedHandler(email) {
		this.changeTab(this.findOrCreateTab(email));
		this.router.navigate(['/chatbox']);
	}
}
