import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServiceStorageService } from '../storage.service';

@Injectable()
export class AuthService {

	constructor(public jwtHelper: JwtHelperService, private storage: ServiceStorageService) { }

	public async isAuthenticated() {
		const token = await this.storage.getItem('ol_tk');
		let ret;

		if (token.length > 0) {
			ret = token ? !this.jwtHelper.isTokenExpired(token) : false;
		} else {
			ret = false;
		}
		// Check whether the token is expired and return
		// true or false
		return ret;
	}
}
