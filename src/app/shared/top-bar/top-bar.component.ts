import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'chat-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
	isCollapsed = true;
	constructor() {}

	ngOnInit() {}
}
