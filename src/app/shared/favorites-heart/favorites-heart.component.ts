import { Component, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { LocalStorageService, ServiceStorageService } from '@app/services/storage.service';
import { EventEmitterService } from '@app/services/event-emitter.service';
import { ApiServicesService } from '@app/services/api-services.service';

@Component({
	selector: 'office-list-favorites-heart',
	templateUrl: './favorites-heart.component.html',
	styleUrls: ['./favorites-heart.component.scss']
})
export class FavoritesHeartComponent implements OnChanges {
	@Input() bcId;
	@Input() bg = false;
	bcFavorites;
	added;
	_bcId;

	constructor(
		private localStorageService: LocalStorageService,
		private sessionStorageService: ServiceStorageService,
		private eventEmitter: EventEmitterService,
		private api: ApiServicesService) { }

	async ngOnChanges(changes: SimpleChanges) {
		const bcId: SimpleChange = changes.bcId;
		if (bcId.currentValue != null) {
			this._bcId = bcId.currentValue;
			this.bcFavorites = await this.localStorageService.getItem('bc_favorites');
			this.added = this.findBusinessCenter();
		}
	}

	findBusinessCenter() {
		return this.bcFavorites.find(e => e === this._bcId) > 0;
	}

	async addFavorites() {

		// Read the existing
		this.bcFavorites = await this.localStorageService.getItem('bc_favorites');
		this.bcFavorites.push(this._bcId);
		await this.localStorageService.setItem('bc_favorites', this.bcFavorites);
		this.added = true;
		this.eventEmitter.favoriteEmitter();

		let clientId = await this.sessionStorageService.getItem('ol_cl');
		clientId = (typeof clientId === 'number') ? clientId : null;

		if (clientId !== null) {
			const data = {
				client_id: clientId,
				bc_list: this._bcId + ',',
			};
			console.log('Entro', data);

			const token = await this.sessionStorageService.getItem('ol_tk');
			this.api.setAddBc(data, token).subscribe(r => {
				console.log(r);
			});
		}
	}
	async removeFavorites() {
		let clientId = await this.sessionStorageService.getItem('ol_cl');
		clientId = (typeof clientId === 'number') ? clientId : null;
		if (clientId === null) {
			this.bcFavorites = await this.localStorageService.getItem('bc_favorites');
			this.bcFavorites = this.bcFavorites.filter(item => {
				return item !== this._bcId;
			});
			await this.localStorageService.setItem('bc_favorites', this.bcFavorites);
			this.added = false;
			this.eventEmitter.favoriteEmitter();
		}
	}
}
