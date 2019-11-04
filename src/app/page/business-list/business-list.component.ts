import { Component, OnInit } from '@angular/core';
import { Meta , Title } from '@angular/platform-browser';

import { ApiServicesService } from '@service/api-services.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { EventEmitterService } from '@app/services/event-emitter.service';

@Component({
	selector: 'office-list-business-list',
	templateUrl: './business-list.component.html',
	styleUrls: ['./business-list.component.scss'],
})
export class BusinessListComponent implements OnInit {
	public selectedBusiness;
	public detailOfficeInfo;
	public filterDistance;
	public allFilters;
	public filterArea;
	public officeInfo;
	public mapShow;
	public listGrid = true;
	bussinesCenter;
	areas;
	originalData;
	bussinesCenterCount;
	city;
	state;

	constructor(
		private api: ApiServicesService,
		private route: ActivatedRoute,
		private deviceService: DeviceDetectorService,
		private eventEmitter: EventEmitterService,
		private meta: Meta,
		private titleService: Title
	) {
		this.detailOfficeInfo = this.allFilters = this.filterArea = this.filterDistance = false;
	}

	ngOnInit() {
		this.mapShow = this.deviceService.isDesktop();
		this.route.params.subscribe(params => {
			this.city = this.capitalizeWords(params['city']);
			this.state = this.capitalizeWords(params['state']);
			const title = `Office Space for Rent ${this.city} :: OfficeList.com`;
			this.titleService.setTitle( title );
			this.api.getBussinesList(params['country'],
				params['state'], params['city'], params['zip_code'])
				.subscribe(result => this.bussinesCenter = result);
		});
	}

	capitalizeWords(str) {
		return str.split('-').map((val) => {
			return val.replace(/\w\S*/g, (txt) => {
				return (txt.length <= 2) ? txt : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}).join(' ');
	}

	showModalDetail(businessInfo) {
		this.selectedBusiness = businessInfo;
		this.detailOfficeInfo = !this.detailOfficeInfo;
	}

	showFilters() {
		this.allFilters = !this.allFilters;
	}

	showFilterArea() {
		this.filterArea = !this.filterArea;
	}

	showFilterDistance() {
		this.filterDistance = !this.filterDistance;
	}

	toogleGrid() {
		this.listGrid = !this.listGrid;
	}

	showMap() {
		this.mapShow = !this.mapShow;
	}

	callSingUp() {
		this.eventEmitter.toogleSingUpEmitter();
	}
}
