import { ChatMessage } from './chat-message';
export class Tab {
	messageHistory: ChatMessage[];
	username: string;
	isActive: boolean;
	unread: number;

	constructor(username: string, messageHistory = []) {
		this.username = username;
		this.messageHistory = messageHistory;
		this.isActive = false;
		this.unread = 0;
	}
}
