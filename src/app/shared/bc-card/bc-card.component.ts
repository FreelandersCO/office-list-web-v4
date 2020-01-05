import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '@app/services/storage.service';
import { ApiServicesService } from '@app/services/api-services.service';
import { EventEmitterService } from '@app/services/event-emitter.service';

@Component({
	selector: 'office-list-bc-card',
	templateUrl: './bc-card.component.html',
	styleUrls: ['./bc-card.component.scss']
})
export class BcCardComponent implements OnInit {
	@Input() bc;
	@Input() grid = false;
	@Input() isDesktop = true;
	@Input() isList = false;
	@Input() isIP = false;

	public selectedBusiness;
	public detailOfficeInfo = false;

	constructor(
		private localStorageService: LocalStorageService,
		private api: ApiServicesService,
		private eventEmitter: EventEmitterService
	) {
	}

	ngOnInit() {
		if (this.eventEmitter.subsVar === undefined) {
			this.eventEmitter.toogleDetails.subscribe((name: string) => {
				this.detailOfficeInfo = false;
			});
			this.eventEmitter.toogleTour.subscribe((name: string) => {
				this.detailOfficeInfo = !this.detailOfficeInfo;
				this.callTour(name);
			});
		}
	}

	async callSingUp(bcId) {// Read the existing
		const bcFavorites = await this.localStorageService.getItem('bc_favorites');
		const obj = bcFavorites.find(o => o === bcId);
		if (obj === undefined) {
			bcFavorites.push(bcId);
			await this.localStorageService.setItem('bc_favorites', bcFavorites);
		}

		this.eventEmitter.favoriteEmitter();
		this.eventEmitter.toogleSingUpEmitter();
	}
	showModalDetail(businessInfo) {
		this.selectedBusiness = businessInfo;
		this.detailOfficeInfo = !this.detailOfficeInfo;
	}
	getNotes(bc) {
		bc.isNote = !bc.isNote;
		if (bc.isNote) {
			this.api.getBCNote(
				bc.buscenter_id
			).subscribe(result => {
				bc.note = result;
			});
		}
	}
	callTour(bcId) {
		this.eventEmitter.toogleTourHeaderEmitter(bcId);
	}
	showInMap(bcId) {
		this.eventEmitter.showInMap(bcId);
	}
}
