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
	privateOffice;
	coWorking;
	virtualOffice;
	hotDesk;
	dedicated;
	showPrivateOffice = false;
	showCoWorking = false;
	showVirtualOffice = false;
	showHotDesk = false;
	showDedicated = false;
	activePrivate = false;
	activeCoWorking = false;
	activeVirtual = false;
	constructor(private api: ApiServicesService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			const explote = params['bc_url'].split('-');
			const bcId = explote[explote.length - 1];
			this.api.getBussinesDetails(bcId).subscribe(result => {
				this.bussinesCenter = result;
				this.processOffice(result);
			});
		});
	}

	processOffice(bcInfo) {
		const offices = bcInfo.offices;
		const findPrivate = offices.find(o => o.type_office_id === '1');
		const findCoWorking = offices.find(o => o.type_office_id === '2' || o.type_office_id === '3');
		const findHotDesk = offices.find(o => o.type_office_id === '3');
		const findDedicated = offices.find(o => o.type_office_id === '2');
		const findVirtual = offices.find(o => o.type_office_id === '4');

		if (findPrivate !== undefined) {
			this.privateOffice = findPrivate;
			this.showPrivateOffice = true;
		}

		if (findCoWorking !== undefined) {
			this.coWorking = findCoWorking;
			this.showCoWorking = true;

			if (findHotDesk !== undefined) {
				this.hotDesk = findHotDesk;
				this.showHotDesk = true;
			}

			if (findDedicated !== undefined) {
				this.dedicated = findDedicated;
				this.showDedicated = true;
			}
		}

		if (findVirtual !== undefined) {
			this.virtualOffice = findVirtual;
			this.showVirtualOffice = true;
		}
	}

	openPrivate() {
		this.activePrivate = true;
		this.activeCoWorking = false;
		this.activeVirtual = false;
	}

	openCoWorking() {
		this.activeCoWorking = true;
		this.activePrivate = false;
		this.activeVirtual = false;

	}

	openVirtual() {
		this.activePrivate = false;
		this.activeCoWorking = false;
		this.activeVirtual = true;
	}
}
