import { Component, OnInit, ɵConsole } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { ActivatedRoute } from '@angular/router';

import { ApiServicesService } from '@app/services/api-services.service';

@Component({
	selector: 'office-list-detail-office',
	templateUrl: './detail-office.component.html',
	styleUrls: ['./detail-office.component.scss']
})
export class DetailOfficeComponent implements OnInit {
	office = 'private';
	config: SwiperOptions = {
		pagination: { el: '.swiper-pagination', clickable: true },
		spaceBetween: 50
	};
	bussinesCenter;

	constructor(private api: ApiServicesService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			const explote = params['bc_url'].split('-');
			const bcId = explote[explote.length - 1];
			this.api.getBussinesDetails(bcId).subscribe(result => this.bussinesCenter = result);
		});
	}

}
