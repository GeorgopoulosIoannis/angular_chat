import { Injectable } from '@angular/core';
import { HubService } from './hub.service';
import { BehaviorSubject } from 'rxjs';
import { Tab } from '../Models/tab';
import { ChatMessage } from '../Models/chat-message';

@Injectable({
	providedIn: 'root'
})
export class SharedService {
	me: string;
	tabs: Tab[];
	list = [];
	connectionEstablished = false;

	constructor(private hub: HubService) {
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

	changeTab(tab: Tab) {
		tab.isActive = true;
		this.tabSource.next(tab);
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
			if (!tab.isActive) {
				tab.unread += 1;
			}
			setTimeout(() => this.updateScroll(), 0);
			console.log(tab);
		});
		this.hub.connectionsList.subscribe(data => {
			this.connectionListSource.next(data);
		});

		this.hub.onlineConnectionsList.subscribe(data => {
			this.onlineConnectionListSource.next(data);
		});
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
		this.updateScroll();
	}
}