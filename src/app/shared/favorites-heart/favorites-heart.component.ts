import { Component, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { LocalStorageService } from '@app/services/local-storage.service';
import { EventEmitterService } from '@app/services/event-emitter.service';

@Component({
	selector: 'office-list-favorites-heart',
	templateUrl: './favorites-heart.component.html',
	styleUrls: ['./favorites-heart.component.scss']
})
export class FavoritesHeartComponent implements OnChanges {
	@Input() bcId;
	bcFavorites;
	added;
	_bcId;
	constructor(private localStorageService: LocalStorageService, private eventEmitter: EventEmitterService) { }

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
	}
	async removeFavorites() {
		this.bcFavorites = await this.localStorageService.getItem('bc_favorites');
		this.bcFavorites = this.bcFavorites.filter(item => {
			return item !== this._bcId;
		});
		await this.localStorageService.setItem('bc_favorites', this.bcFavorites);
		this.added = false;
		this.eventEmitter.favoriteEmitter();
	}
}
