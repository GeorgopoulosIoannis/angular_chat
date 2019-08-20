import { Injectable, EventEmitter } from '@angular/core';
import { ChatMessage } from '../Models/chat-message';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HubService {
	connected = false;
	messageReceived = new EventEmitter<ChatMessage>();
	connectionsList = new EventEmitter<[string]>();
	onlineConnectionsList = new EventEmitter<[string]>();

	private hubConnection: HubConnection;

	constructor() {}

	sendPrivateMessage(message: ChatMessage) {
		this.hubConnection.invoke('sendPrivateMessage', message);
	}

	getAccessToken() {
		const accessToken = localStorage.getItem('token');
		return accessToken;
	}

	startNegotiation() {
		if (!this.connected) {
			this.createConnection();
			this.registerOnServerEvents();
			this.startConnection();
		}
	}
	stopConnection() {
		this.hubConnection.stop();
	}
	private createConnection() {
		this.hubConnection = new HubConnectionBuilder()
			.withUrl(environment.api + 'chat/?access_token=' + this.getAccessToken())
			.build();
	}

	private startConnection(): void {
		this.hubConnection
			.start()
			.then(() => {
				console.log('Hub connection started');
				this.connected = true;
			})
			.catch(err => {
				console.log('Error while establishing connection, retrying...');
				setTimeout(() => this.startConnection(), 5000);
			});
	}

	private registerOnServerEvents(): void {
		this.hubConnection.on('SendToAll', (data: any) => {
			console.log(data);
		});

		this.hubConnection.on('SendConnections', (data: [string]) => {
			this.connectionsList.emit(data);
		});

		this.hubConnection.on('ReceiveMessage', (data: ChatMessage) => {
			this.messageReceived.emit(data);
		});
		this.hubConnection.on('SendOnlineConnections', (data: [string]) => {
			this.onlineConnectionsList.emit(data);
		});
	}
}
