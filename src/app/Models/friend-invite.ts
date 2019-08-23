export class FriendInvite {
	email: string;
	status: number;

	constructor(email: string, status: number) {
		this.email = email;
		this.status = status;
	}
}
