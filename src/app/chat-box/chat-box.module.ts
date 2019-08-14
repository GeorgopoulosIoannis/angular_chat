import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxLayoutComponent } from './chat-box-layout/chat-box-layout.component';
import { ChatBoxMessageHistoryComponent } from './chat-box-message-history/chat-box-message-history.component';
import { ChatBoxInputComponent } from './chat-box-input/chat-box-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { AngularResizedEventModule } from 'angular-resize-event';

@NgModule({
	declarations: [ChatBoxLayoutComponent, ChatBoxMessageHistoryComponent, ChatBoxInputComponent],
	imports: [CommonModule, FormsModule, TabsModule, ReactiveFormsModule, BrowserModule, AngularResizedEventModule],
	exports: [ChatBoxInputComponent, ChatBoxLayoutComponent, ChatBoxMessageHistoryComponent]
})
export class ChatBoxModule {}
