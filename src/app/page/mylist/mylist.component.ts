import { Component, OnInit } from '@angular/core';
import { ServiceStorageService } from '@app/services/storage.service';
import { ApiServicesService } from '@app/services/api-services.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

import { NormalizeString } from '@app/shared/utils/normalize-string.pipe';

@Component({
	selector: 'office-list-mylist',
	templateUrl: './mylist.component.html',
	styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {
	bussinesCenter;
	grid = false;
	isDesktop = false;
	constructor(
		private api: ApiServicesService,
		private storage: ServiceStorageService,
		private deviceService: DeviceDetectorService,
		private router: Router,
		private normalize: NormalizeString) { }

	async ngOnInit() {
		const token = await this.storage.getItem('ol_tk');
		this.api.getMyList(token).subscribe(r => {
			this.processData(r);
		});

		// View
		if (this.deviceService.isDesktop()) {
			this.isDesktop = true;
		}
	}

	processData(r) {
		this.bussinesCenter = r.result.bussines;
	}

	goToList(){
		const bussinesC =	this.bussinesCenter[0];
		const state = this.normalize.normalizeString(bussinesC.state_name);
		const city = this.normalize.normalizeString(bussinesC.city);
		const url = `/office-space-for-rent/us/${state}/${city}/`;
		this.router.navigate([url]);
	}
}
