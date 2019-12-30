import { Component, OnInit } from '@angular/core';
import { ServiceStorageService } from '@app/services/storage.service';
import { ApiServicesService } from '@app/services/api-services.service';

@Component({
	selector: 'office-list-mylist',
	templateUrl: './mylist.component.html',
	styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {
	bussinesCenter;
	constructor(private api: ApiServicesService, private storage: ServiceStorageService) { }

	async ngOnInit() {
		const token = await this.storage.getItem('ol_tk');
		this.api.getMyList(token).subscribe(r => {
			this.processData(r);
		});
	}

	processData(r) {
		this.bussinesCenter = r.result.bussines;
	}
}
