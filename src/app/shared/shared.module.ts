import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RouterModule } from '@angular/router';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
	declarations: [TopBarComponent],
	imports: [CommonModule, RouterModule, CollapseModule, BrowserAnimationsModule],
	exports: [TopBarComponent]
})
export class SharedModule {}
