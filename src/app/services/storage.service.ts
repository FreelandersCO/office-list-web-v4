import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, SESSION_STORAGE , StorageService } from 'ngx-webstorage-service';

@Injectable({
	providedIn: 'root'
})

export class LocalStorageService {
	constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
	}

	setItem(key: string, data) {
		this.storage.set(key, data);
	}

	async getItem(key) {
		const item = this.storage.get(key);

		return item ? item : [];
	}

	clear() {
		this.storage.clear();
	}
}

// tslint:disable-next-line: max-classes-per-file
@Injectable({
	providedIn: 'root'
})
export class ServiceStorageService {
	constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {
	}

	setItem(key: string, data) {
		this.storage.set(key, data);
	}

	async getItem(key) {
		const item = this.storage.get(key);

		return item ? item : [];
	}
}
