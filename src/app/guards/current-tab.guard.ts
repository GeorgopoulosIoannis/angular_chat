import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { SharedService } from '../services/shared.service';

@Injectable({
	providedIn: 'root'
})
export class CurrentTabGuard implements CanActivate {
	constructor(public shared: SharedService, public router: Router) {}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.shared.tabs.length > 0) {

			return true;
		}
		this.router.navigate(['/friends']);
	}
}
