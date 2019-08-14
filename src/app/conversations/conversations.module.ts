import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationsListComponent } from './conversations-list/conversations-list.component';

@NgModule({
	declarations: [ConversationsListComponent],
	imports: [CommonModule],
	exports: [ConversationsListComponent]
})
export class ConversationsModule {}
