import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
	constructor(public auth: AuthService, public router: Router) { }
	async canActivate() {
		const isAut = await this.auth.isAuthenticated();
		if (!isAut) {
			this.router.navigate(['/404']);

			return false;
		}

		return true;
	}
}
