import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@app/services/storage.service';
import { ApiServicesService } from '@app/services/api-services.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
	selector: 'office-list-business-favorites',
	templateUrl: './business-favorites.component.html',
	styleUrls: ['./business-favorites.component.scss']
})
export class BusinessFavoritesComponent implements OnInit {
	bcFavorites;
	bussinesCenter;
	public grid = false;
	public isDesktop = false;
	constructor(
		private localStorageService: LocalStorageService,
		private api: ApiServicesService,
		private deviceService: DeviceDetectorService) { }

	async ngOnInit() {
		this.bcFavorites = await this.localStorageService.getItem('bc_favorites');
		this.api.getFavoritesBc(
			this.bcFavorites
			).subscribe(result => {
				this.bussinesCenter = result;
			}
		);
		if (this.deviceService.isDesktop()) {
			this.isDesktop = true;
			this.grid = false;
		}
	}

}
