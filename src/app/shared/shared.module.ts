import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RouterModule } from '@angular/router';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedLayoutComponent } from './shared-layout/shared-layout.component';
@NgModule({
	declarations: [TopBarComponent, SharedLayoutComponent],
	imports: [CommonModule, RouterModule, CollapseModule, BrowserAnimationsModule],
	exports: [TopBarComponent, SharedLayoutComponent]
})
export class SharedModule {}
