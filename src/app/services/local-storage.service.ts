import { Injectable } from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class LocalStorageService  {
	constructor() {
	}

	setItem(key: string, data) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	// tslint:disable-next-line: ban-types
	async getItem(key) {
		const item = localStorage.getItem(key);

		return item !== null ? JSON.parse(item) : [];
	}
}
