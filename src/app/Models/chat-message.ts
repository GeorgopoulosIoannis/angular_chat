import { User } from './user';

export class ChatMessage {
	message: string;
	from: string;
	to: string;
	unread: boolean;

	constructor(from: string = '', message: string = '', to: string = '') {
		this.from = from;
		this.to = to;
		this.message = message;
	}
}
