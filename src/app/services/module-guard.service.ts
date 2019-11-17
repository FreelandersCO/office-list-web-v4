import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class ModuleGuardService implements CanActivate {
	constructor(private router: Router, location: Location) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const type = route.data['type'][0];
		let ret;
		// tslint:disable-next-line: radix
		const lastParameter = route.params.last_parameter;
		const part = lastParameter.split('-');
		const partLong = part.length;
		const lastOfLast = part[partLong - 1];
		switch (type) {
			case 'details':
				if (isNaN(lastParameter)) {
					ret = !isNaN(lastOfLast) ? true : false;
				}
				break;
			case 'zipcode':
				if (!isNaN(lastParameter)) {
					ret = true;
				} else {
					ret = !isNaN(lastOfLast) ? false : true;
				}
				break;
		}
		console.log(type, ret);

		return ret;
	}
}
