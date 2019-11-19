import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CookiesService {

	constructor(private cookieService: CookieService) { }

	getCookie(name) {
		return this.cookieService.get(name);
	}
}
