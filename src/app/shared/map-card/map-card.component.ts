import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { EventEmitterService } from '@app/services/event-emitter.service';
import { LocalStorageService } from '@app/services/storage.service';

@Component({
	selector: 'office-list-map-card',
	templateUrl: './map-card.component.html',
	styleUrls: ['./map-card.component.scss']
})
export class MapCardComponent implements OnChanges {
	@Input() businessInfo;
	business;
	constructor(
		private eventEmitter: EventEmitterService, private localStorageService: LocalStorageService) { }

	ngOnChanges(changes: SimpleChanges) {
		const businessInfo: SimpleChange = changes.businessInfo;

		if (businessInfo.currentValue != null) {
			this.business = businessInfo.currentValue;
		}
	}

	async callSingUp(bcId) {
		const bcFavorites = await this.localStorageService.getItem('bc_favorites');
		bcFavorites.push(bcId);
		await this.localStorageService.setItem('bc_favorites', bcFavorites);

		this.eventEmitter.favoriteEmitter();
		this.eventEmitter.toogleSingUpEmitter();
	}
}
