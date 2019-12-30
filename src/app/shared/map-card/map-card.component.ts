import { Component, OnChanges, Input, SimpleChanges, SimpleChange, OnInit } from '@angular/core';
import { EventEmitterService } from '@app/services/event-emitter.service';
import { LocalStorageService } from '@app/services/storage.service';

@Component({
	selector: 'office-list-map-card',
	templateUrl: './map-card.component.html',
	styleUrls: ['./map-card.component.scss']
})
export class MapCardComponent implements OnInit, OnChanges {
	@Input() businessInfo;
	business;
	bcFavorites;
	added = false;
	constructor(
		private eventEmitter: EventEmitterService,
		private localStorageService: LocalStorageService) { }

	async ngOnInit(): Promise<void> {
		this.bcFavorites = await this.localStorageService.getItem('bc_favorites');
	}

	ngOnChanges(changes: SimpleChanges) {
		const businessInfo: SimpleChange = changes.businessInfo;
		if (businessInfo.currentValue != null) {
			this.business = businessInfo.currentValue;
			this.added = this.findBusinessCenter(this.business.buscenter_id);
		}
	}

	findBusinessCenter(bcId) {
		return this.bcFavorites.find(e => e === bcId) > 0;
	}

	async callSingUp(bcId) {
		if (!this.findBusinessCenter(bcId)) {
			this.bcFavorites.push(bcId);
			await this.localStorageService.setItem('bc_favorites', this.bcFavorites);
			this.eventEmitter.favoriteEmitter();
		}
		this.eventEmitter.toogleSingUpEmitter();
	}
}
